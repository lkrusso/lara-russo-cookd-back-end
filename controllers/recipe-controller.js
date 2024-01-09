const knex = require("knex")(require("../knexfile"));

const getSingleRecipe = async (req, res) => {
  const id = req.params.id;
  try {
    const recipe = await knex("recipes").where({ id: id });
    if (!recipe) {
      return res.status(404).send(`Recipe with ID ${id} not found`);
    }
    res.status(200).send(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Unable to retrieve recipe with ID ${id}`);
  }
};

const getNonCookbookRecipes = async (req, res) => {
  try {
    const userID = req.params.id;
    if (!userID) {
      return res.status(400).send("Please include the ID of the user");
    }

    const matchingUser = await knex("users").where({ id: userID });
    if (matchingUser.length === 0) {
      return res
        .status(404)
        .send(`The user with ID ${req.params.id} does not exist`);
    }

    const filteredRecipes = await knex("recipes")
      .where({ user_id: userID })
      .whereNull("cookbook_id");

    if (filteredRecipes.length === 0) {
      return res
        .status(404)
        .send(`No non-cookbook recipes found by user with ID ${userID}`);
    }

    return res.status(200).send(filteredRecipes);
  } catch (error) {
    return res
      .status(500)
      .send(
        `Unable to get filtered recipes due to server-side error: ${error}`
      );
  }
};

const getAllUserRecipes = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send("Please include the ID of the user");
    }

    const matchingUser = await knex("users").where({ id: req.params.id });
    if (matchingUser.length === 0) {
      return res
        .status(404)
        .send(`The user with ID ${req.params.id} does not exist`);
    }

    const recipes = await knex("recipes").where({ user_id: req.params.id });
    if (recipes.length === 0) {
      return res
        .status(404)
        .send(`No recipes found by user with ID ${req.params.id}`);
    }
    res.status(201).send(recipes);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        `Unable to get the recipes of user with ID ${req.params.id} due to server-side error`
      );
  }
};

const createRecipe = async (req, res) => {
  try {
    const { user_id, title, duration, serves, cuisine_type } = req.body;

    if (!user_id || !title || !duration || !serves || !cuisine_type) {
      return res
        .status(400)
        .send("Please ensure you have provided all information necessary");
    }

    if (
      typeof user_id !== "number" ||
      typeof duration !== "number" ||
      typeof serves !== "number"
    ) {
      return res
        .status(400)
        .send("Please ensure that IDs, duration and serves are all numbers");
    }

    const allUsers = await knex("users");
    let isMatchingUser = false;

    allUsers.forEach((user) => {
      if (user.id === user_id) {
        isMatchingUser = true;
      }
    });

    if (!isMatchingUser) {
      return res
        .status(400)
        .send("The user ID does not match. Please try again");
    }

    const newRecipe = { user_id, title, duration, serves, cuisine_type };

    await knex("recipes").insert(newRecipe);
    const addedRecipeID = await knex("recipes")
      .where({
        user_id: newRecipe.user_id,
      })
      .where({ title: newRecipe.title })
      .where({ duration: newRecipe.duration })
      .where({ serves: newRecipe.serves })
      .where({ cuisine_type: newRecipe.cuisine_type })
      .select("id");
    res.status(200).send(addedRecipeID);
  } catch (error) {
    return res
      .status(500)
      .send(`Unable to create a new recipe due to server-side error: ${error}`);
  }
};

const addToCookbook = async (req, res) => {
  const { cookbookID, recipeList } = req.body;

  if (!cookbookID || !recipeList) {
    return res
      .status(400)
      .send("Please ensure you have provided all information necessary");
  }

  if (typeof cookbookID !== "number") {
    return res.status(400).send("Please ensure that cookbook ID is a number");
  }

  const allCookbooks = await knex("cookbooks");
  let isMatchingCookbook = false;

  allCookbooks.forEach((cookbook) => {
    if (cookbook.id === cookbookID) {
      isMatchingCookbook = true;
    }
  });

  if (!isMatchingCookbook) {
    return res
      .status(400)
      .send("The cookbook ID does not match. Please try again");
  }

  recipeList.forEach(async (item) => {
    const modifiedRecipe = await knex("recipes").where({ id: item.id }).first();
    if (typeof modifiedRecipe.cookbook_id === "object") {
      await knex("recipes")
        .where({ id: item.id })
        .update({ cookbook_id: cookbookID });
    }
  });

  const updatedCookbook = await knex("recipes").where({
    cookbook_id: cookbookID,
  });

  res.status(200).send(updatedCookbook);
  return;
};

const updateRecipe = async (req, res) => {
  const recipe = req.body;
  const { id, title, duration, serves, cuisine_type } = req.body;
  console.log(recipe);
  try {
    const updatedRecord = await knex("recipes")
      .where({ id: id })
      .update(recipe);

    if (updatedRecord === 0) {
      return res.status(404).send(`Recipe with ID ${id} was not found`);
    }

    const updatedRecipe = await knex("recipes").where({ id: id });
    res.status(200).send(updatedRecipe[0]);
    return;
  } catch (error) {
    res.status(500).send(`Unable to update recipe with ID ${id}: ${error}`);
    return;
  }
};

const deleteRecipe = async (req, res) => {
  let { id } = req.params;

  try {
    const result = await knex("instructions").where({ recipe_id: id }).delete();
    if (result === 0) {
      return res
        .status(404)
        .send(
          `The instructions of recipe with ID ${id} were not found and thus couldn't be deleted`
        );
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Unable to delete instructions due to server-side error");
  }
  try {
    const result = await knex("ingredients").where({ recipe_id: id }).delete();
    if (result === 0) {
      return res
        .status(404)
        .send(
          `The ingredients of recipe with ID ${id} were not found and thus couldn't be deleted`
        );
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Unable to delete ingredients due to server-side error");
  }

  try {
    const result = await knex("recipes").where({ id: id }).del();
    if (result === 0) {
      return res
        .status(404)
        .send(
          `Recipe with ID ${id} was not found and thus couldn't be deleted`
        );
    }
    return res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .send(`Unable to delete recipe with ID ${id}: ${error}`);
  }
};

module.exports = {
  getSingleRecipe,
  getAllUserRecipes,
  createRecipe,
  addToCookbook,
  updateRecipe,
  deleteRecipe,
  getNonCookbookRecipes,
};

const knex = require("knex")(require("../knexfile"));

const getSingleCookbook = async (req, res) => {
  const id = req.params.id;
  try {
    const cookbook = await knex("cookbooks").where({ id: id });
    if (!cookbook) {
      return res.status(404).send(`Cookbook with ID ${id} not found`);
    }
    res.status(200).send(cookbook);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Unable to retrieve cookbook with ID ${id}`);
  }
};

const getCookbooks = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send("Please include the ID of the cookbook");
    }
    const cookbooks = await knex("cookbooks").where({
      user_id: req.params.id,
    });
    if (cookbooks.length === 0) {
      return res
        .status(404)
        .send(`No cookbooks by user with ID ${req.params.id} were found`);
    }
    res.status(201).send(cookbooks);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        `Unable to get cookbooks for user with ID ${req.params.id} due to server-side error`
      );
  }
};

const createCookbook = async (req, res) => {
  try {
    const { user_id, name } = req.body;
    if (!user_id || !name) {
      return res
        .status(400)
        .send("Please ensure you have provided all information necessary");
    }
    if (typeof user_id !== "number") {
      return res.status(400).send("Please ensure the user ID is a number");
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

    const newCookbook = { user_id, name };
    await knex("cookbooks").insert(newCookbook);
    const addedCookbookID = await knex("cookbooks")
      .where({ user_id: newCookbook.user_id })
      .where({ name: newCookbook.name })
      .select("id");
    res.status(200).send(addedCookbookID);
  } catch (error) {
    return res
      .status(500)
      .send(
        `Unable to create a new cookbook due to server-side error: ${error}`
      );
  }
};

const deleteCookbook = async (req, res) => {
  let { id } = req.params;
  try {
    const result = await knex("recipes")
      .where({ cookbook_id: id })
      .update({ cookbook_id: null });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        "Unable to update recipes + delete cookbook due to server-side error"
      );
  }

  try {
    const result = await knex("cookbooks").where({ id: id }).del();
    console.log(result);
    return res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .send(`Unable to delete recipe with ID ${id}: ${error}`);
  }
};

const getCookbookRecipes = async (req, res) => {
  const cookbookID = req.params.id;
  if (!cookbookID) {
    return res.status(400).send("Please include the ID of the cookbook");
  }

  try {
    const validCookbook = await knex("cookbooks").where({ id: cookbookID });
    if (validCookbook.length === 0) {
      return res
        .status(404)
        .send(`Cookbook with ID ${cookbookID} was not found`);
    }
    const recipes = await knex("recipes").where({ cookbook_id: cookbookID });

    if (recipes.length === 0) {
      return res
        .status(404)
        .send(`There are no recipes in cookbook with ID ${cookbookID}`);
    }

    return res.status(200).send(recipes);
  } catch (error) {
    return res
      .status(500)
      .send(
        `Unable to get the recipes from cookbook with ID ${cookbookID} due to a server-side error: ${error}`
      );
  }
};

module.exports = {
  getSingleCookbook,
  getCookbooks,
  createCookbook,
  deleteCookbook,
  getCookbookRecipes,
};

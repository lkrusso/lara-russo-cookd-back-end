const knex = require("knex")(require("../knexfile"));

const getAllRecipes = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).send("Please include the ID of the user");
    }
    const recipes = await knex("recipes").where({ user_id: req.body.id });
    if (!recipes) {
      return res.status(404).send("No recipes found");
    }
    res.status(201).send(recipes);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        `Unable to get ${req.body.username}'s recipes due to server-side error`
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

module.exports = { getAllRecipes, createRecipe };

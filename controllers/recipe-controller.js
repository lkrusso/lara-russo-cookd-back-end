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

module.exports = { getAllRecipes };

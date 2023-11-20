const knex = require("knex")(require("../knexfile"));

const getAllRecipes = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).send("Please include the ID of the user");
    }
    const recipes = await knex("recipes").where({ user_id: req.body.id });
    let recipeObj = {};
    let recipeList = [];
    for (let i = 0; i < recipes.length; i++) {
      let recipe = recipes[i];
      const ingredients = await knex("ingredients")
        .where({ recipe_id: recipe.id })
        .select("ingredients.name", "ingredients.quantity");
      const instructions = await knex("instructions")
        .where({ recipe_id: recipe.id })
        .select("instructions.instruction");
      recipeObj = {
        ...recipe,
        ingredients: ingredients,
        instructions: instructions,
      };
      recipeList = [...recipeList, recipeObj];
    }
    if (recipeList.length === 0) {
      return res
        .status(404)
        .send(`No recipes were found by user ${req.body.id}`);
    }
    res.status(201).send(recipeList);
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

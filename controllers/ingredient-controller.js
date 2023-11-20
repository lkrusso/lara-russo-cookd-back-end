const knex = require("knex")(require("../knexfile"));

const getIngredients = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).send("Please include the ID of the recipe");
    }
    const ingredients = await knex("ingredients").where({
      recipe_id: req.body.id,
    });
    if (ingredients.length === 0) {
      return res.status(404).send("No ingredients found");
    }
    res.status(201).send(ingredients);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        `Unable to get ingredients for recipe with ID ${req.body.id} due to server-side error`
      );
  }
};

module.exports = { getIngredients };

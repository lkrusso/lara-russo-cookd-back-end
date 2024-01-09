const knex = require("knex")(require("../knexfile"));

const getSingleReview = async (req, res) => {
  const recipeID = req.params.id;
  if (!recipeID) {
    return res.status(400).send("Please include the ID of the recipe");
  }
  try {
    const recipe = await knex("recipes").where({ id: recipeID });
    console.log(recipe);
    if (recipe.length === 0) {
      return res.status(404).send(`Recipe with ID ${recipeID} not found`);
    }
    const review = await knex("reviews").where({ recipe_id: recipeID });
    console.log(review);
    if (review.length === 0) {
      return res.status(404).send(`No review for recipe with ID ${recipeID}`);
    }
    return res.status(200).send(review);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(`Unable to retrieve a review for the recipe with ID ${recipeID}`);
  }
};

module.exports = { getSingleReview };

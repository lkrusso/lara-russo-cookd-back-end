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

const createReview = async (req, res) => {
  try {
    const { recipe_id, rating, comment } = req.body;
    if (!recipe_id || !rating || !comment) {
      return res
        .status(400)
        .send("Please ensure you have provided all the information necessary");
    }
    if (typeof recipe_id !== "number" || typeof rating !== "number") {
      return res
        .status(400)
        .send("Please ensure that IDs and ratings are numbers");
    }
    if (typeof comment !== "string") {
      return res.status(400).send("Please ensure that the comment is a string");
    }

    const isExistingRecipe = await knex("recipes").where({ id: recipe_id });
    console.log(isExistingRecipe);
    if (isExistingRecipe.length === 0) {
      return res.status(404).send(`Recipe with ID ${recipe_id} not found`);
    }

    const isExistingReview = await knex("reviews").where({
      recipe_id: recipe_id,
    });
    console.log(isExistingReview);
    if (isExistingReview.length !== 0) {
      return res
        .status(400)
        .send(`Review for recipe with ID ${recipe_id} already exists`);
    }

    const newReview = { recipe_id, rating, comment };
    await knex("reviews").insert(newReview);
    const addedReview = await knex("reviews").where({ recipe_id: recipe_id });
    return res.status(200).send(addedReview);
  } catch (error) {
    return res
      .status(500)
      .send(`Unable to create a new review due to server-side error`);
  }
};

module.exports = { getSingleReview, createReview };

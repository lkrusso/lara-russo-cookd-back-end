const knex = require("knex")(require("../knexfile"));

const getIngredients = async (req, res) => {
  try {
    if (!req.body.recipe_id) {
      return res.status(400).send("Please include the ID of the recipe");
    }

    const allRecipes = await knex("recipes");
    let isMatchingRecipe = false;

    allRecipes.forEach((recipe) => {
      if (recipe.id === req.body.recipe_id) {
        isMatchingRecipe = true;
      }
    });

    if (!isMatchingRecipe) {
      return res
        .status(400)
        .send("The recipe ID does not exist in the DB. Please try again");
    }

    const ingredients = await knex("ingredients").where({
      recipe_id: req.body.recipe_id,
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

const createIngredients = async (req, res) => {
  try {
    const { recipe_id, ingredientList } = req.body;
    console.log(ingredientList);
    if (!recipe_id) {
      return res.status(400).send("Please include the ID of the recipe");
    }

    if (!ingredientList) {
      return res
        .status(400)
        .send("Please include the ingredients of the recipe");
    }

    const validRecipeID = await knex("recipes").where({ id: recipe_id });
    if (!validRecipeID) {
      return res
        .status(400)
        .send("The recipe ID sent was not valid. Please try again");
    }

    let ingredientDetails = {};

    for (let i = 0; i < ingredientList.length; i++) {
      ingredientDetails = {
        recipe_id: recipe_id,
        name: ingredientList[i].ingredient,
        quantity: ingredientList[i].quantity,
      };

      await knex("ingredients").insert(ingredientDetails);
    }

    const addedIngredients = await knex("ingredients").where({
      recipe_id: recipe_id,
    });

    return res.status(200).send(addedIngredients);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(
        `Unable to create ingredients for recipe with ID ${req.body.recipe_id} due to server-side error`
      );
  }
};

const updateIngredients = async (req, res) => {
  const ingredients = req.body;
  let updatedIngredientList = [];
  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    try {
      const updatedRecord = await knex("ingredients")
        .where({ id: ingredient.id })
        .update(ingredient);

      if (updatedRecord === 0) {
        return res
          .status(404)
          .send(
            `Ingredient with ID ${ingredient.id} of recipe with ID ${ingredient.recipe_id} was not found`
          );
      }

      const updatedIngredient = await knex("ingredients").where({
        id: ingredient.id,
      });
      updatedIngredientList.push(updatedIngredient[0]);
    } catch (error) {
      res
        .status(500)
        .send(
          `Unable to update the ingredient with ID ${ingredient.id} of recipe with ID ${ingredient.recipe_id}: ${error}`
        );
      return;
    }
  }
  res.status(200).send(updatedIngredientList);
  return;
};

module.exports = { getIngredients, createIngredients, updateIngredients };

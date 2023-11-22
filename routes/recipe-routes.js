const router = require("express").Router();
const recipeController = require("../controllers/recipe-controller");

router.route("/").post(recipeController.getAllRecipes);
router.route("/add").post(recipeController.createRecipe);

module.exports = router;

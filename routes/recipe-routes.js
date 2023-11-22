const router = require("express").Router();
const recipeController = require("../controllers/recipe-controller");

router.route("/").post(recipeController.getAllRecipes);
router.route("/add").post(recipeController.createRecipe);
router.route("/update").patch(recipeController.addToCookbook);

module.exports = router;

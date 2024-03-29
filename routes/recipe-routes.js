const router = require("express").Router();
const recipeController = require("../controllers/recipe-controller");

router.route("/users/:id").get(recipeController.getAllUserRecipes);
router
  .route("/users/nocookbooks/:id")
  .get(recipeController.getNonCookbookRecipes);
router.route("/:id").get(recipeController.getSingleRecipe);
router.route("/:id/delete").delete(recipeController.deleteRecipe);
router.route("/add").post(recipeController.createRecipe);
router.route("/update").patch(recipeController.addToCookbook);
router.route("/edit").patch(recipeController.updateRecipe);

module.exports = router;

const router = require("express").Router();
const recipeController = require("../controllers/recipe-controller");

router.route("/users/:id").get(recipeController.getAllUserRecipes);
router
  .route("/:id")
  .get(recipeController.getSingleRecipe)
  .delete(recipeController.deleteRecipe);
router.route("/add").post(recipeController.createRecipe);
router.route("/update").patch(recipeController.addToCookbook);
router.route("/edit").patch(recipeController.updateRecipe);

module.exports = router;

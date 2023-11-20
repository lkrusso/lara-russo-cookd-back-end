const router = require("express").Router();
const recipeController = require("../controllers/recipe-controller");

router.route("/").post(recipeController.getAllRecipes);

module.exports = router;

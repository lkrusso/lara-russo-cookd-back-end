const router = require("express").Router();
const recipeController = require("../controllers/recipe-controller");

router.route("/").get(recipeController.getAllRecipes);

module.exports = router;

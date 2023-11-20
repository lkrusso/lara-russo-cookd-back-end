const router = require("express").Router();
const ingredientController = require("../controllers/ingredient-controller");

router.route("/").post(ingredientController.getIngredients);

module.exports = router;

const router = require("express").Router();
const ingredientController = require("../controllers/ingredient-controller");

router.route("/").post(ingredientController.getIngredients);
router.route("/add").post(ingredientController.createIngredients);

module.exports = router;

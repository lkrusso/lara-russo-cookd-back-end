const router = require("express").Router();
const ingredientController = require("../controllers/ingredient-controller");

router.route("/:id").get(ingredientController.getIngredients);
router.route("/add").post(ingredientController.createIngredients);
router.route("/edit").patch(ingredientController.updateIngredients);

module.exports = router;

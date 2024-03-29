const router = require("express").Router();
const cookbookController = require("../controllers/cookbook-controller");

router.route("/users/:id").get(cookbookController.getCookbooks);
router.route("/:id").get(cookbookController.getSingleCookbook);
router.route("/:id/edit").patch(cookbookController.updateCookbook);
router.route("/:id/delete").delete(cookbookController.deleteCookbook);
router.route("/add").post(cookbookController.createCookbook);
router.route("/:id/recipes").get(cookbookController.getCookbookRecipes);

module.exports = router;

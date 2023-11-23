const router = require("express").Router();
const cookbookController = require("../controllers/cookbook-controller");

router.route("/").post(cookbookController.getCookbooks);
router
  .route("/:id")
  .get(cookbookController.getSingleCookbook)
  .delete(cookbookController.deleteCookbook);
router.route("/add").post(cookbookController.createCookbook);

module.exports = router;

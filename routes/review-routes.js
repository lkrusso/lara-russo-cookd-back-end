const router = require("express").Router();
const reviewController = require("../controllers/review-controller");

router.route("/:id").get(reviewController.getSingleReview);
router.route("/add").post(reviewController.createReview);

module.exports = router;

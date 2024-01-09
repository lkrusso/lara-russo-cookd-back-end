const router = require("express").Router();
const reviewController = require("../controllers/review-controller");

router.route("/:id").get(reviewController.getSingleReview);

module.exports = router;

const router = require("express").Router();
const cookbookController = require("../controllers/cookbook-controller");

router.route("/").post(cookbookController.getCookbooks);

module.exports = router;

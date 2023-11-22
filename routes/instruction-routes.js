const router = require("express").Router();
const instructionController = require("../controllers/instruction-controller");

router.route("/").post(instructionController.getInstructions);
router.route("/add").post(instructionController.createInstructions);

module.exports = router;

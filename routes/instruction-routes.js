const router = require("express").Router();
const instructionController = require("../controllers/instruction-controller");

router.route("/").post(instructionController.getInstructions);

module.exports = router;

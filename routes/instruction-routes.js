const router = require("express").Router();
const instructionController = require("../controllers/instruction-controller");

router.route("/:id").get(instructionController.getInstructions);
router.route("/add").post(instructionController.createInstructions);
router.route("/edit").patch(instructionController.updateInstructions);

module.exports = router;

const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/").get(userController.getUser);
router.route("/:id").delete(userController.deleteUser);

module.exports = router;

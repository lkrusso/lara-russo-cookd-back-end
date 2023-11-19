const router = require("express").Router();
const userController = require("../controllers/user-controller");

router.route("/").get(userController.getUser).post(userController.createUser);

module.exports = router;

const router = require("express").Router();
const authController = require("../controllers/auth-controller");

router.route("/login").post(authController.userLogin);
router.route("/details").get(authController.userDetails);
router.route("/register").post(authController.createUser);

module.exports = router;

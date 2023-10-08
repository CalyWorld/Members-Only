const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

router.get("/", user_controller.index);
router.get("/user/signin", user_controller.user_signin_get);
router.get("/user/signup", user_controller.user_signup_get);
module.exports = router;

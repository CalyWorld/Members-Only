const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

router.get("/", user_controller.index);
router.get("/user/signin", user_controller.user_signin_get);

module.exports = router;

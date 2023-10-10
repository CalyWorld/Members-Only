const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");

router.get("/", user_controller.index);
router.get("/join", user_controller.membership_authenticator_get);
router.post("/join", user_controller.membership_authenticator_post);
router.post("/usermessage", user_controller.user_message);
module.exports = router;

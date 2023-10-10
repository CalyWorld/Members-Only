const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");

router.get("/", user_controller.index);
router.get("/join", user_controller.membership_authenticator_get);
router.post("/join", user_controller.membership_authenticator_post);
router.get("/usermessage", user_controller.user_message_get);
router.post("/usermessage", user_controller.user_message_post);
router.get("/admin", user_controller.become_an_admin_get);
router.post("/admin", user_controller.become_an_admin_post);
router.get("/:id/delete", user_controller.user_message_delete_get);
router.post("/:id/delete", user_controller.user_message_delete_post);
module.exports = router;

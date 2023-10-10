const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");

router.get("/", user_controller.index);
router.get("/:id/join", user_controller.membership_authenticator_get);
router.post("/:id/join", user_controller.membership_authenticator_post);
module.exports = router;

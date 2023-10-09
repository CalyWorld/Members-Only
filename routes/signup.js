const express = require("express");
const router = express.Router();
const signup_controller = require("../controllers/signupController");
router.get("/", signup_controller.signup_get);
router.post("/", signup_controller.signup_post);
module.exports = router;

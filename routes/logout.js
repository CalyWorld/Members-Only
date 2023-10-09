const express = require("express");
const router = express.Router();
const logout_controller = require("../controllers/logoutController");
router.get("/", logout_controller.user_logout_get);
module.exports = router;

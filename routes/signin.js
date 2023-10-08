const express = require("express");
const router = express.Router();
const signin_controller = require("../controllers/signinController");
router.get("/", signin_controller.signin_get);

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const signin_controller = require("../controllers/signinController");
router.get("/", signin_controller.signin_get);
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/signin",
  }),
);
module.exports = router;

const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
exports.signin_get = asyncHandler(async (req, res, next) => {
  res.render("sign_in_form");
});

exports.signin_post = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  }),
];

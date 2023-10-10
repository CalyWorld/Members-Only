const asyncHandler = require("express-async-handler");
const passport = require("passport");
exports.signin_get = asyncHandler(async (req, res, next) => {
  res.render("sign_in_form");
});

exports.signin_post = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  }),
];

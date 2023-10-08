const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", {
    title: "Express",
  });
});

exports.user_signin_get = asyncHandler(async (req, res, next) => {
  res.render("sign_in_form");
});
exports.user_signup_get = asyncHandler(async (req, res, next) => {
  res.render("sign_up_form");
});

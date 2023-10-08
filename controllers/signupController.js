const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("sign_up_form");
});

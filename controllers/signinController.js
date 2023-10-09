const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
exports.signin_get = asyncHandler(async (req, res, next) => {
  res.render("sign_in_form");
});

const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
exports.index = asyncHandler(async (req, res, next) => {
  console.log({ user: req.user });
  res.render("user", {
    title: "Welcome User",
    user: req.user,
  });
});

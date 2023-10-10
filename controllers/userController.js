const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const membership_password = process.env.MEMBERSHIP_PASSWORD;
exports.index = asyncHandler(async (req, res, next) => {
  res.render("user", {
    title: "Welcome User",
    user: req.user,
  });
});
exports.membership_authenticator_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.render("membership_form", {
    title: "Membership form",
    user: user,
  });
});
exports.membership_authenticator_post = [
  body("password", "Password must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom((value, { req }) => {
      if (value !== membership_password) {
        throw new Error("Password doesn't match");
      }
      return true;
    }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = await User.findById(req.params.id);
    const userDetails = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      status: "Member",
      _id: req.params.id,
    });
    console.log({ id: req.params.id, user: user });
    if (!errors.isEmpty()) {
      res.render("membership_form", {
        title: "Membership form",
        errors: errors.array(),
      });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        userDetails,
        {},
      );
      res.redirect(updatedUser.url);
    }
  }),
];

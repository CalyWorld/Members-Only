const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("sign_up_form");
});
exports.signup_post = [
  body("firstName", "First name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "Last name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Username must not be empty and must be a valid email")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .normalizeEmail(),
  body("password", "Password must not be empty").trim().isLength({ min: 5 }),
  body("confirmPassword", "Password doesn't match").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("passwords don't match");
    }
    return true;
  }),
  asyncHandler(async (req, res, next) => {
    const userInput = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
    };
    console.log(userInput);
    const errors = validationResult(req);
    const existingUser = await User.findOne({ username: userInput.username });
    if (existingUser) {
      errors.errors.push({ msg: "Username is already taken" });
    }
    if (!errors.isEmpty()) {
      return res.render("sign_up_form", {
        user: userInput,
        errors: errors.array(),
      });
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          password: hashedPassword,
        });
        try {
          await user.save();
          res.redirect("/");
        } catch (err) {
          return next(err);
        }
      }
    });
  }),
];

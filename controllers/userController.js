const User = require("../models/user");
const UserMessage = require("../models/userMessage");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const membership_password = process.env.MEMBERSHIP_PASSWORD;
const admin_password = process.env.ADMIN_PASSWORD;

exports.index = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const allUserMessages = await UserMessage.find({}, "title text").exec();
  let allMessagesByUsers;
  if (user) {
    console.log(user._id);
    allMessagesByUsers = await UserMessage.find({ createdBy: user._id })
      .populate("createdBy")
      .exec();
    for (let i = 0; i < allMessagesByUsers.length; i++) {
      console.log(allMessagesByUsers[0].createdBy);
    }
  }

  console.log({ allMessagesByUsers: allMessagesByUsers });
  res.render("user", {
    title: "Welcome",
    user: user,
    allUserMessages: allUserMessages,
    allMessagesByUsers: allMessagesByUsers,
  });
});
exports.membership_authenticator_get = asyncHandler(async (req, res, next) => {
  const user = req.user;
  console.log({ locals: user });
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
    const user = req.user;
    const userDetail = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      status: "Member",
      _id: user._id,
    });
    if (!errors.isEmpty()) {
      res.render("membership_form", {
        title: "Membership form",
        errors: errors.array(),
      });
    } else {
      await User.findByIdAndUpdate(user._id, userDetail, {});
      res.redirect("/");
    }
  }),
];
exports.user_message_get = asyncHandler(async (req, res, next) => {
  res.render("message_form", {
    user: req.user,
  });
});
exports.user_message_post = [
  body("title", "Title must not be empty").trim().isLength({ min: 1 }).escape(),
  body("text", "Text must not be empty").trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    const errors = validationResult(req);
    const userMessage = new UserMessage({
      title: req.body.title,
      text: req.body.text,
      timestamp: Date.now(),
      createdBy: user._id,
    });
    if (!errors.isEmpty()) {
      res.render("message_form", {
        user: user,
        errors: errors.array(),
      });
    } else {
      await userMessage.save();
      res.redirect("/");
    }
  }),
];

exports.become_an_admin_get = asyncHandler(async (req, res, next) => {
  const user = req.user;
  res.render("admin_form", {
    title: "Admin Form",
    user: user,
  });
});

exports.become_an_admin_post = [
  body("password", "Password must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom((value, { req }) => {
      if (value !== admin_password) {
        throw new Error("Password doesn't match");
      }
      return true;
    }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = req.user;
    const userDetail = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: user.password,
      status: "Admin",
      _id: user._id,
    });
    if (!errors.isEmpty()) {
      res.render("membership_form", {
        title: "Membership form",
        errors: errors.array(),
      });
    } else {
      await User.findByIdAndUpdate(user._id, userDetail, {});
      res.redirect("/");
    }
  }),
];

exports.user_message_delete_get = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const userMessage = await UserMessage.findById(req.params.id);
  res.render("delete_form", {
    user: user,
    userMessage: userMessage,
  });
});

exports.user_message_delete_post = asyncHandler(async (req, res, next) => {
  await UserMessage.findByIdAndRemove(req.body.usermessageid);
  res.redirect("/");
});

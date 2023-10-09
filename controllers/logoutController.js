const asyncHandler = require("express-async-handler");

exports.user_logout_get = asyncHandler(async (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

const asyncHandler = require("express-async-handler");
exports.index = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  res.render("index", {
    title: "Express",
  });
});

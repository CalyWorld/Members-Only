const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Member", "Admin", "None"],
    default: "None",
  },
});

UserSchema.virtual("url").get(function () {
  return `/${this._id}`;
});
module.exports = mongoose.model("User", UserSchema);

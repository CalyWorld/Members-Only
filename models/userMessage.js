const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserMessageSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("UserMessageSchema", UserMessageSchema);

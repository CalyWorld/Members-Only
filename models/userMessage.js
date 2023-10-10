const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");
const UserMessageSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

UserMessageSchema.virtual("formattedTimestamp").get(function () {
  return DateTime.fromJSDate(this.timestamp).toFormat("yyyy LLLL d, t");
});

module.exports = mongoose.model("UserMessage", UserMessageSchema);

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  city: String,
  content: String,
  time: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

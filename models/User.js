var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password: String,
  name: String,
  phone: Number,
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

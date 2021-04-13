var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password: String,
  name: String,
  phone: Number,
});

var User = mongoose.model("User", userSchema);

module.exports = User;

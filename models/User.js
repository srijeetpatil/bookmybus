var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password: String,
  name: String,
  phone: Number,
  bookings: [
    {
      busId: String,
      company_name: String,
      bus_name: String,
      start_time: String,
      start_place: String,
      end_time: String,
      end_place: String,
      commute_time: String,
      city_from: String,
      city_to: String,
      total: Number,
      my_seats: [],
      time: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

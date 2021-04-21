var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var busSchema = new Schema({
  _id: Schema.Types.ObjectId,
  company_name: String,
  bus_name: String,
  start_time: String,
  start_place: String,
  end_time: String,
  end_place: String,
  commute_time: String,
  starting_price: Number,
  seats_available: Number,
  city_from: String,
  city_to: String,
  seats: [{ type: Schema.Types.ObjectId }],
});

module.exports = mongoose.models.Bus || mongoose.model("Bus", busSchema);

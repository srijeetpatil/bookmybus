var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var citySchema = new Schema({
  place: String,
  lat: Number,
  lng: Number,
  transport: [
    {
      transport_type: String,
      name: String,
      rate: String,
      route: String,
      time: String,
      routes: [{ type: String }],
      coordinates: [{ lat: Number, lng: Number }],
    },
  ],
});

module.exports = mongoose.models.City || mongoose.model("City", citySchema);

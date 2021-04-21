var connectObject = require("../../util/mongodb");
var mongoose = require("mongoose");
var Bus = require("../../models/Bus");

export default async function Addbuses(req, res) {
  if (req.method === "POST") {
    await connectObject.connectToDatabase();
    let data = req.body;
    let company_name = data.company_name;
    let bus_name = data.bus_name;
    let start_time = data.start_time;
    let start_place = data.start_place;
    let end_time = data.end_time;
    let end_place = data.end_place;
    let commute_time = data.commute_time;
    let starting_price = data.starting_price;
    let seats_available = data.seats_available;
    let city_from = data.city_from;
    let city_to = data.city_to;
    if (
      company_name &&
      bus_name &&
      start_time &&
      start_place &&
      end_time &&
      end_place &&
      commute_time &&
      starting_price &&
      seats_available &&
      city_from &&
      city_to
    ) {
      let newBus = new Bus({
        _id: new mongoose.Types.ObjectId(),
        company_name: company_name,
        bus_name: bus_name,
        start_time: start_time,
        start_place: start_place,
        end_time: end_time,
        end_place: end_place,
        commute_time: commute_time,
        starting_price: starting_price,
        seats_available: seats_available,
        city_from: city_from,
        city_to: city_to,
      });
      newBus.save((err) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.status(200).json({ message: "Success" });
        }
      });
    }
  } else {
    res.status(405).json({ error: "Method not supported" });
  }
}

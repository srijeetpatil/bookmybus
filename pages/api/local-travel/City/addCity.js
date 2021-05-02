var City = require("../../../../models/City");
var connectObject = require("../../../../util/mongodb");

async function checkCity(req, res) {
  return new Promise((resolve, reject) => {
    let city = req.body.place;
    City.find({ place: city }, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        return reject(false);
      } else if (result.length > 0) {
        res.status(400).json({ error: "City already present" });
        return reject(false);
      } else {
        return resolve(true);
      }
    });
  });
}

export default async function AddCity(req, res) {
  if (req.method === "POST") {
    await connectObject.connectToDatabase();
    let check = await checkCity(req, res);
    if (check) {
      let data = req.body;
      let place = data.place;
      let lat = data.lat;
      let lng = data.lng;
      let transport = data.transport;
      if (Array.isArray(transport) && place && lat && lng) {
        let newCity = new City({
          place: place,
          lat: lat,
          lng: lng,
          transport: transport,
        });
        newCity.save((err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            res.status(200).json({ message: "Success" });
          }
        });
      } else {
        res.status(400).json({ error: "Partial data provided" });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

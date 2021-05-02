var City = require("../../../../models/City");
var connectObject = require("../../../../util/mongodb");

export default async function GetCity(req, res) {
  if (req.method === "GET") {
    await connectObject.connectToDatabase();
    let city = req.query.id;
    City.find({ place: city }, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else if (result) {
        res.status(200).json({ data: result });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

var connectObject = require("../../util/mongodb");
var Bus = require("../../models/Bus");

export default async function RefreshBuses(req, res) {
  if (req.method === "DELETE") {
    await connectObject.connectToDatabase();
    Bus.updateMany({ seats: [], seats_available: 34 }, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ result: result });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

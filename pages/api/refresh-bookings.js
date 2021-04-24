var connectObject = require("../../util/mongodb");
var User = require("../../models/User");

export default async function RefreshBookings(req, res) {
  if (req.method === "DELETE") {
    await connectObject.connectToDatabase();
    User.updateMany({ bookings: [] }, (err, result) => {
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

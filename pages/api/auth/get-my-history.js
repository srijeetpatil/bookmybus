var connectObject = require("../../../util/mongodb");
var User = require("../../../models/User");
var mongoose = require("mongoose");
var decrypt = require("../../../util/crypto");

async function Getmyprofile(req, res) {
  if (req.method === "GET") {
    await connectObject.connectToDatabase();
    let id = req.headers.authorization;
    if (id) {
      id = id.split("Token ")[1];
      id = decrypt.decrypt(id);
      User.findById(id, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
        } else if (result) {
          res.status(200).json({ result: result.bookings });
        }
      });
    } else {
      res.status(400).json({ error: "Not logged in" + id });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export default Getmyprofile;

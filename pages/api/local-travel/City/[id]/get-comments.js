var connectObject = require("../../../../../util/mongodb");
var Comment = require("../../../../../models/Comment");
var User = require("../../../../../models/User");

export default async function GetComments(req, res) {
  if (req.method === "GET") {
    let city = req.query.id;
    await connectObject.connectToDatabase();
    Comment.find({ city: city })
      .populate("author", "name picture")
      .exec((err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
        } else if (result) {
          res.status(200).json({ comments: result });
        }
      });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

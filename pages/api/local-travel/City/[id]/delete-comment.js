var crypto = require("../../../../../util/crypto");
var connectObject = require("../../../../../util/mongodb");
var Comment = require("../../../../../models/Comment");

export default async function DeleteComment(req, res) {
  if (req.method === "DELETE") {
    let commentId = req.body.commentId;
    let id = req.headers.authorization;
    id = id.split("Token ")[1];
    id = crypto.decrypt(id);
    await connectObject.connectToDatabase();
    Comment.findOneAndDelete({ _id: commentId, author: id }, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else if (result) {
        res.status(200).json({ message: "Success" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

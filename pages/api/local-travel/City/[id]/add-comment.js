var connectObject = require("../../../../../util/mongodb");
var Comment = require("../../../../../models/Comment");
var City = require("../../../../../models/City");
var User = require("../../../../../models/User");
var mongoose = require("mongoose");
var crypto = require("../../../../../util/crypto");

async function verifyUser(req, res) {
  return new Promise((resolve, reject) => {
    let id = req.headers.authorization;
    if (id) {
      id = id.split("Token ")[1];
      id = crypto.decrypt(id);
      User.findById(id, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
          return reject(false);
        } else if (result) {
          return resolve(true);
        }
      });
    } else {
      res.status(403).json({ error: "Forbidden" });
      return reject(false);
    }
  });
}

async function getCity(req, res) {
  return new Promise(async (resolve, reject) => {
    let city = req.query.id;
    await connectObject.connectToDatabase();
    City.find({ place: city }, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        return reject(false);
      } else if (result.length > 0) {
        return resolve(result[0]);
      } else {
        res.status(400).json({ error: "Invalid city name" });
        return reject(false);
      }
    });
  });
}

async function createComment(req, res) {
  return new Promise((resolve, reject) => {
    let city = req.query.id;
    let comment = req.body.comment;
    let id = req.headers.authorization;
    id = id.split("Token ")[1];
    id = crypto.decrypt(id);
    let newComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      author: id,
      content: comment,
      city: city,
    });
    newComment.save((err) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        return reject(false);
      } else {
        res.status(200).json({ message: "Success" });
        return resolve(true);
      }
    });
  });
}

export default async function AddComment(req, res) {
  if (req.method === "POST") {
    let citydata = await getCity(req, res);
    if (citydata) {
      let verify = await verifyUser(req, res);
      if (verify) {
        await createComment(req, res);
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

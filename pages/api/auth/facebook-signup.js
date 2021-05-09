var connectObject = require("../../../util/mongodb");
var User = require("../../../models/User");
var mongoose = require("mongoose");
var axios = require("axios");

async function getFacebookUser(req, res) {
  return new Promise((resolve, reject) => {
    let userID = req.body.userID;
    let accessToken = req.body.accessToken;
    axios
      .get(
        "https://graph.facebook.com/" +
          userID +
          "?fields=name,picture,email&access_token=" +
          accessToken
      )
      .then((response) => {
        if (!response.status == 200) throw new Error();
        return resolve(response.data);
      })
      .catch((error) => {
        return reject(false);
      });
  });
}

async function userExists(req, res, email) {
  await connectObject.connectToDatabase();
  return new Promise((resolve, reject) => {
    User.find({ email: email }, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        return reject(false);
      } else if (result.length != 0) {
        res.status(400).json({ error: "User already exists with same email" });
        return reject(false);
      } else {
        return resolve(true);
      }
    });
  });
}

export default async function FacebookSignup(req, res) {
  if (req.method === "POST") {
    let user = await getFacebookUser(req, res);
    if (user) {
      let name = user.name;
      let picture = user.picture.data.url;
      let email = user.email;
      let middlewareUserExists = await userExists(req, res, email);
      if (middlewareUserExists) {
        let newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          email: email,
          name: name,
          picture: picture,
          type: "Facebook",
        });
        newUser.save((err) => {
          if (err) {
            res.status(500).json({ error: "Internal server error" });
          } else {
            res.status(200).json({ message: "Success" });
          }
        });
      }
    } else {
      res.status(400).json({ error: "Invalid token" });
    }
  } else {
  }
}

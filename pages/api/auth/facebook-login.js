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

async function updateFacebookuser(email, name, picture) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(
      { email: email },
      { name: name, picture: picture },
      { new: true },
      (err, result) => {
        if (err) {
          return reject(false);
        } else if (result) {
          return resolve(true);
        }
      }
    );
  });
}

export default async function FacebookLogin(req, res) {
  if (req.method === "POST") {
    let user = await getFacebookUser(req, res);
    if (user) {
      let email = user.email;
      User.find({ email: email, type: "Facebook" }, async (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
        } else if (result.length != 0) {
          let name = user.name;
          let picture = user.picture.data.url;
          if (name != result[0].name || picture != result[0].picture) {
            await updateFacebookuser(email, name, picture);
          }
          let id = result[0]._id;
          res.status(200).json({ id: id });
        } else {
          res.status(400).json({ error: "You need to signup first" });
        }
      });
    } else {
      res.status(400).json({ error: "Invalid token" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

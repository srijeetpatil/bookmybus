var connectObject = require("../../../util/mongodb");
var User = require("../../../models/User");
var mongoose = require("mongoose");
var axios = require("axios");

async function getGoogleUser(req, res) {
  return new Promise((resolve, reject) => {
    let token = req.body.token;
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
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

export default async function GoogleSignup(req, res) {
  if (req.method === "POST") {
    let user = await getGoogleUser(req, res);
    if (user) {
      let name = user.name;
      let picture = user.picture;
      let email = user.email;
      let middlewareUserExists = await userExists(req, res, email);
      if (middlewareUserExists) {
        let newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          email: email,
          name: name,
          picture: picture,
          type: "Google",
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

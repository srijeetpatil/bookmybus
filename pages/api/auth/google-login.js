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

export default async function GoogleLogin(req, res) {
  if (req.method === "POST") {
    let user = await getGoogleUser(req, res);
    if (user) {
      let email = user.email;
      User.find({ email: email, type: "Google" }, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
        } else if (result.length != 0) {
          let name = user.name;
          let picture = user.picture;
          if (name != result[0].name || picture != result[0].picture) {
            //update logic
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

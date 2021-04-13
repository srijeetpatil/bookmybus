var connectObject = require("../../../util/mongodb");
var User = require("../../../models/User");
var mongoose = require("mongoose");

async function userExists(req, res) {
  await connectObject.connectToDatabase();
  return new Promise((resolve, reject) => {
    let email = req.body.email;
    User.find({ email: email }, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        reject();
      } else if (result.length != 0) {
        resolve();
      } else {
        res.status(400).json({ error: "Invalid email or password" });
        reject();
      }
    });
  });
}

export default async function Login(req, res) {
  if (req.method === "POST") {
    await userExists(req, res)
      .then((resolve) => {
        let data = req.body;
        let email = data.email;
        let password = data.password;
        User.find({ email: email, password: password }, (err, result) => {
          if (err) {
            res.status(500).json({ error: "Internal server error" });
          } else if (result.length != 0) {
            res.status(200).json({ result: result });
          } else {
            res.status(400).json({ error: "Invalid email or password" });
          }
        });
      })
      .catch((reject) => {
        console.log("Error in Userexists");
      });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

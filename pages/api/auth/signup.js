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
        res.status(400).json({ error: "User already exists with same email" });
        reject();
      } else {
        resolve();
      }
    });
  });
}

export default async function Signup(req, res) {
  if (req.method === "POST") {
    await userExists(req, res)
      .then((resolve) => {
        let data = req.body;
        let name = data.name;
        let email = data.email;
        let password = data.password;
        let phone = data.phone;
        if (name && email && password && phone) {
          let newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            name: name,
            password: password,
            phone: phone,
          });
          newUser.save((err) => {
            if (err) {
              res.status(500).json({ error: "Internal server error" });
            } else {
              res.status(200).json({ message: "Success" });
            }
          });
        } else {
          res.status(400).json({ error: "Provide complete data" });
        }
      })
      .catch((reject) => {
        console.log("Error rejected in Userexists");
      });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

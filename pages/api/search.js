var connectObject = require("../../util/mongodb");
var Bus = require("../../models/Bus");

function isValidRequest(req, res) {
  return new Promise((resolve, reject) => {
    let data = req.query;
    if (!data) {
      res.status(400).json({ error: "Bad request" });
      reject();
    } else {
      let from = data.from;
      let to = data.to;
      if (from && to) {
        resolve();
      } else {
        res.status(400).json({ error: "Bad request" });
        reject();
      }
    }
  });
}

export default async function Search(req, res) {
  await isValidRequest(req, res)
    .then(async (resolve) => {
      await connectObject.connectToDatabase();
      let data = req.query;
      let from = data.from;
      let to = data.to;
      Bus.find({ city_from: from, city_to: to }, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
        } else {
          let data = result;
          res.status(200).json({ result: data });
        }
      });
    })
    .catch((reject) => {});
}

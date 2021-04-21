var connectObject = require("../../../util/mongodb");
var Bus = require("../../../models/Bus");
var decrypt = require("../../../util/crypto");
var User = require("../../../models/User");

const userExists = async (req, res) => {
  await connectObject.connectToDatabase();
  return new Promise((resolve, reject) => {
    let id = req.headers.authorization;
    if (id) {
      id = id.split("Token ")[1];
      User.findById(id, (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
          return reject(false);
        } else if (result) {
          return resolve(result);
        }
      });
    } else {
      res.status(400).json({ error: "Provide authorization details" });
      return reject(false);
    }
  });
};

const updateSeats = (req, res) => {
  return new Promise((resolve, reject) => {
    let data = req.body;
    let seat = data.seat;
    let busId = req.query.busId;
    let id = req.headers.authorization;
    let seats = result.seats;
    seats[seat - 1] = id;
    let seats_available = result.seats_available;
    seats_available = seats_available - 1;
    Bus.findByIdAndUpdate(
      busId,
      { seats: seats, seats_available: seats_available },
      (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
          return reject(false);
        } else if (result) {
          return resolve(true);
        }
      }
    );
  });
};

const updateBookings = (req, res, user) => {
  return new Promise((resolve, reject) => {
    let id = req.headers.authorization;
    id = id.split("Token ")[1];
    let bookings = user.bookings;
    let data = req.body;
    let busId = req.query.busId;
    let total = data.total;
    User.findByIdAndUpdate(id);
  });
};

const busExists = async (req, res, user) => {
  return new Promise((resolve, reject) => {
    let busId = req.query.busId;
    let id = req.headers.authorization;
    id = id.split("Token ")[1];
    Bus.findById(busId, async (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        return reject(false);
      } else if (result) {
        let mw1 = await updateSeats(req, res);
        if (mw1) {
          await updateBookings(req, res, user);
        }
      } else {
        res.status(400).json({ error: "Invalid busID" });
        return reject(false);
      }
    });
  });
};

export default async function BookTicket(req, res) {
  if (req.method === "POST") {
    let mw1 = await userExists(req, res);
    if (mw1) {
      await busExists(req, res, mw1);
    } else {
      res.status(400).json({ error: "Authorization details incorrect" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

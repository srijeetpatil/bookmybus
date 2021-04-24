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
      id = decrypt.decrypt(id);
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

const updateSeats = (req, res, result) => {
  return new Promise((resolve, reject) => {
    let data = req.body;
    let mySeats = data.seats;
    let busId = req.query.busId;
    let id = req.headers.authorization;
    id = id.split("Token ")[1];
    id = decrypt.decrypt(id);
    let seats = result.seats;
    let seats_available = result.seats_available;
    for (let i = 0; i < mySeats.length; i++) {
      if (!seats[mySeats[i] - 1]) {
        seats[mySeats[i] - 1] = id;
        seats_available = seats_available - 1;
      } else {
        res
          .status(400)
          .json({ error: "Seat " + mySeats[i] + " already taken" });
        return reject(false);
      }
    }
    Bus.findByIdAndUpdate(
      busId,
      { seats: seats, seats_available: seats_available },
      { new: true },
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

const updateBookings = (req, res, user, bus) => {
  return new Promise((resolve, reject) => {
    let id = req.headers.authorization;
    id = id.split("Token ")[1];
    id = decrypt.decrypt(id);
    let bookings = user.bookings;
    let data = req.body;
    let busId = req.query.busId;
    let total = data.total;
    let seats = data.seats;
    let booking = {
      busId: busId,
      company_name: bus.company_name,
      bus_name: bus.bus_name,
      start_time: bus.start_time,
      start_place: bus.start_place,
      end_time: bus.end_time,
      end_place: bus.end_place,
      commute_time: bus.commute_time,
      city_from: bus.city_from,
      city_to: bus.city_to,
      total: total,
      my_seats: seats,
    };
    bookings = bookings.concat(booking);
    User.findByIdAndUpdate(
      id,
      { bookings: bookings },
      { new: true },
      (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
          return reject(false);
        } else {
          res.status(200).json({ message: "Success" });
          return resolve(true);
        }
      }
    );
  });
};

const middleware = async (req, res, user) => {
  return new Promise((resolve, reject) => {
    let busId = req.query.busId;
    let id = req.headers.authorization;
    id = id.split("Token ")[1];
    id = decrypt.decrypt(id);
    Bus.findById(busId, async (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
        return reject(false);
      } else if (result) {
        let mw1 = await updateSeats(req, res, result);
        if (mw1) {
          await updateBookings(req, res, user, result);
          return resolve(true);
        } else {
          res.status(500).json({ error: "Internal server error" });
          return reject(false);
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
      await middleware(req, res, mw1);
    } else {
      res.status(400).json({ error: "Authorization details incorrect" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

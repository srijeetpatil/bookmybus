var connectObject = require("../../util/mongodb");
var Bus = require("../../models/Bus");
var decrypt = require("../../util/crypto");
var User = require("../../models/User");

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

async function cancelBooking(req, res, user) {
  return new Promise((resolve, reject) => {
    let data = req.body;
    let bookingId = data.bookingId;
    let id = req.headers.authorization;
    id = id.split("Token ")[1];
    id = decrypt.decrypt(id);
    let bookings = user.bookings;
    let seats = [];
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i]._id.toString() === bookingId) {
        seats = seats.concat(bookings[i].my_seats);
        bookings.splice(i, 1);
        break;
      }
    }
    User.findByIdAndUpdate(
      id,
      { bookings: bookings },
      { new: true },
      (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
          return reject(false);
        } else if (result) {
          return resolve(seats);
        }
      }
    );
  });
}

async function cancelSeats(req, res, bus, seats) {
  return new Promise((resolve, reject) => {
    let data = req.body;
    let busId = data.busId;
    let busSeats = bus.seats;
    let id = req.headers.authorization;
    id = id.split("Token ")[1];
    id = decrypt.decrypt(id);
    for (let i = 0; i < seats.length; i++) {
      if (busSeats[seats[i] - 1] != id.toString()) {
        res.status(400).json("These seats do not belong to you");
        return reject(false);
      } else {
        busSeats[seats[i] - 1] = null;
      }
    }
    Bus.findByIdAndUpdate(
      busId,
      { seats: busSeats },
      { new: true },
      (err, result) => {
        if (err) {
          res.status(500).json({ error: "Internal server error" });
          return reject(false);
        } else if (result) {
          res.status(200).json({ message: "Success" });
          return resolve(true);
        }
      }
    );
  });
}

async function middleware(req, res) {
  return new Promise(async (resolve, reject) => {
    let user = await userExists(req, res);
    if (user) {
      let busId = req.body.busId;
      if (busId) {
        Bus.findById(busId, (err, result) => {
          if (err) {
            res.status(500).json({ error: "Internal server error" });
            return reject(false);
          } else if (result) {
            return resolve({ result: result, user: user });
          }
        });
      } else {
        res.status(400).json({ error: "Provide bus id" });
        return reject(false);
      }
    } else {
      res.status(400).json({ error: "Provide authorization details" });
      return reject(false);
    }
  });
}

export default async function CancelTicket(req, res) {
  if (req.method === "DELETE") {
    console.log(req.body);
    let { result, user } = await middleware(req, res);
    let seats = await cancelBooking(req, res, user);
    if (seats) {
      await cancelSeats(req, res, result, seats);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

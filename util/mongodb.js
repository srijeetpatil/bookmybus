import mongoose from "mongoose";
require("dotenv").config();

const { MONGODB_URI, MONGODB_DB } = process.env;

let cachedClient = null;
let cachedDb = null;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  try {
    const client = mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    mongoose.connection.on("connected", () => {
      console.log("Connected to DB");
    });
    mongoose.connection.on("error", (error) => {
      console.log(error);
    });
    const db = MONGODB_DB;
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (error) {
    console.log(error);
  }
}

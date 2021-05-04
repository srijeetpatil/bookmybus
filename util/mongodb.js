import mongoose from "mongoose";

const { React_App_MONGODB_URI, React_App_MONGODB_DB } = process.env;

let cachedClient = null;
let cachedDb = null;

if (!React_App_MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!React_App_MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  try {
    const client = mongoose.connect(React_App_MONGODB_URI, {
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
    const db = React_App_MONGODB_DB;
    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (error) {
    console.log(error);
  }
}

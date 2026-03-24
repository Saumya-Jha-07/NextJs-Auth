import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

let isConnected = false;

export default async function connectDB() {
  try {
    if (isConnected) return;

    await mongoose.connect(MONGODB_URI!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      isConnected = true;
      console.log("Mongo DB connected successfully!");
    });

    connection.on("error", (err) => {
      console.log("Error while connecting to Mongo DB : " + err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error : ", error);
  }
}

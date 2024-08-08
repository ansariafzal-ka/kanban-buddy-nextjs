import mongoose from "mongoose";

let isConnected = false;
export const connectDb = async () => {
  try {
    if (isConnected) {
      console.log("MongoDb already connected");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI || "");
    isConnected = true;
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log("An error occured during connecting to MongoDb : ", error);
  }
};

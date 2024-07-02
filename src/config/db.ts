import mongoose from "mongoose";
import { MONGO_URI } from "./const";

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectToDB;

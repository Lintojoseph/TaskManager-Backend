import mongoose from "mongoose";
import Configs from "./configs";

export const connectDb = async () => {
  if (!Configs.mongohost) {
    throw new Error("MongoDB connection string (MONGO_HOST) is undefined");
  }

  try {
    
    await mongoose.connect(Configs.mongohost);
    console.log(Configs.mongohost,'URL');
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); 
  }
};

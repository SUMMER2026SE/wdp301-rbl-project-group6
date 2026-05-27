import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;
export const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully!");

    // Drop legacy unique index on phone if it exists
    try {
      await mongoose.connection.collection("users").dropIndex("phone_1");
      console.log("Dropped legacy phone_1 index");
    } catch {
      // Index doesn't exist, ignore
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); 
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

}
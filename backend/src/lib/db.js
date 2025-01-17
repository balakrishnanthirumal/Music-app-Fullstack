import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to mongoDB ${conn.connection.host}`);
  } catch (error) {
    console.log("Failed to connect to mongoDB", error);
    process.exit(1);
  }
};
export default connectDB;

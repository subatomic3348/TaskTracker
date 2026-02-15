import mongoose from "mongoose";

export const dataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("db connected");
  } catch (e) {
    console.log("db connection failed");
    
  }
};

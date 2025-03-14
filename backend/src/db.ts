import mongoose from "mongoose";


export async function connectDB() {
    const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is missing in .env file");
}


    try {
      await mongoose.connect(MONGO_URI)
      console.log("✅ MongoDB Connected Successfully!");
  
      
      
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
      process.exit(1);
    }
  }

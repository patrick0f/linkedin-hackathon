import mongoose, { Connection } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

let isConnected: Connection | boolean = false;

const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDB already connected");
        return isConnected;
    }
    try {
        const res = await mongoose.connect(process.env.MONGO_URI!);
        isConnected = res.connection;
        console.log("MongoDB connected successfully");
        return isConnected;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDB; 
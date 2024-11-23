// IMPORT 
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const connectionString = process.env.MONGO_URI

export default async function connectDB() {
    try {
        await mongoose.connect(connectionString)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}


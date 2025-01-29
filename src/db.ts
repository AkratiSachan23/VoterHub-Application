import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);

        //Check your .env file: Ensure that your .env file contains the correct MONGO_URI variable and that the file is in the root directory of your project. It should look something like this:
        //MONGO_URI=mongodb://localhost:27017/your-database-name

        console.log("✅ MongoDB Connected...");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB;

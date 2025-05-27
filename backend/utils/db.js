import mongoose from "mongoose";

let isConnected = false; // Prevent multiple connections

const connectDB = async () => {

    if (isConnected) {
        console.log('MongoDB already connected');
        return;
    }

    try {

        const database = await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log(`Database connected successfully : ${database.connection.host}`);

    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

export default connectDB;
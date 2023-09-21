import mongoose from 'mongoose';

export const connectToDB = async () => {
    const DB_URI = 'mongodb+srv://mongouser:naankhatai@cluster0.wn7ulme.mongodb.net/?retryWrites=true&w=majority';  // replace 'your-database-name' with your actual database name

    try {
        await mongoose.connect(DB_URI);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);  // Exit with a failure code
    }
};

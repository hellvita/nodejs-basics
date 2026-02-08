import mongoose from 'mongoose';
import { Student } from '../models/student.js';

export const connectMongoDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URL;

    await mongoose.connect(mongoURL);
    console.log('✅ MongoDB connection established successfully');

    // !! indexes will work only if it sync by syncIndexes
    await Student.syncIndexes();
    console.log('Indexes synced successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);

    process.exit(1);
  }
};

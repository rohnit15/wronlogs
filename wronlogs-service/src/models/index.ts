import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

export const mongooseInstance = mongoose.connect(mongoUri)
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
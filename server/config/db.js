import mongoose from 'mongoose';
import 'dotenv/config';

export const connectToDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/neuroagpt`);
  } catch (error) {
    console.log(error.message);
  }
}

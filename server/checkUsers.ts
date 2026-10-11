import 'dotenv/config';
import mongoose from 'mongoose';
import User from './src/models/User';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/edumind';

async function checkUsers() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const users = await User.find({}).select('-password'); // Exclude passwords for safety
    console.log(`Found ${users.length} user(s):`);
    console.log(JSON.stringify(users, null, 2));

  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

checkUsers();

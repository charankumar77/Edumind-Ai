import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import testRoutes from './routes/test';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;

// Since we may not have a real MongoDB instance handy during development, 
// let's wrap connection logic to allow it to fail gracefully if no URI is provided.
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/edumind';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

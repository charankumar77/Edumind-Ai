import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import testRoutes from './routes/test';
import aiRoutes from './routes/ai';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Edumind Backend API is running!');
});

app.get('/health', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'ok',
    database: states[mongoose.connection.readyState] || 'unknown',
    readyState: mongoose.connection.readyState
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/ai', aiRoutes);

const parsedPort = parseInt(process.env.PORT || '', 10);
const PORT = (!isNaN(parsedPort) && parsedPort > 0) ? parsedPort : 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/edumind';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message || err);
  });

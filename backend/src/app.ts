import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

dotenv.config();

const app = express();

const mongoUrl = process.env.MONGODB_URI || 'mongodb+srv://vamsi:Va9381721427%40@cluster0.pz37jxb.mongodb.net/JOob-Search-Agent';

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
  origin: [
    'https://muli-agent-j-ob-search.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.get('/api/health', (req, res) => {
  const status = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ mongo: status });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;

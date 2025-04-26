import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import FeedbackRouter from './src/routes';
import connectDB from './config/config';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/feedback/health', (req, res) => {
    res.status(200).json({ status: 'Its working' });
  });
app.use('/feedback', FeedbackRouter.router);

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/db';
import postsRouter from './routes/posts';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Routes
app.use('/api/posts', postsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'LinkedIn Clone API' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
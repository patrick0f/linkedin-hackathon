import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/db';
import postsRouter from './routes/posts';
import usersRouter from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Supabase
connectDB()
  .then(() => {
    console.log('Connected to Supabase');
  })
  .catch((error) => {
    console.error('Failed to connect to Supabase:', error);
    process.exit(1);
  });

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ message: 'LinkedIn Clone API' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
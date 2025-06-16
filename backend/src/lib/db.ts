import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL!;

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL environment variable');
}

export const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function connectDB() {
  try {
    // Test the connection
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    
    console.log('Connected to PostgreSQL via Supabase');
    return pool;
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error);
    throw error;
  }
} 
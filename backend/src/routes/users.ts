import express from 'express';
import { supabase } from '../lib/db';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      throw error;
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { id, name, current_location, time_avail, connections, streak_count } = req.body;
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id,
          name,
          current_location,
          time_avail,
          connections,
          streak_count: streak_count || 0
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, current_location, time_avail, connections, streak_count } = req.body;
    
    const { data, error } = await supabase
      .from('users')
      .update({
        name,
        current_location,
        time_avail,
        connections,
        streak_count
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

export default router; 
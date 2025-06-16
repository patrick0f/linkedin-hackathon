import express from 'express';
import { pool } from '../lib/db';
import { IPost } from '../models/post.model';
import { IComment } from '../models/comment.model';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { rows: posts } = await pool.query(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { description, user, imageUrl } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO posts (description, user, image_url) VALUES ($1, $2, $3) RETURNING *',
      [description, JSON.stringify(user), imageUrl]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Like/unlike a post
router.patch('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    // Get current post
    const { rows } = await pool.query(
      'SELECT likes FROM posts WHERE id = $1',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update likes
    const currentLikes = rows[0].likes || [];
    const likeIndex = currentLikes.indexOf(userId);
    let newLikes;
    
    if (likeIndex > -1) {
      newLikes = currentLikes.filter((like: string) => like !== userId);
    } else {
      newLikes = [...currentLikes, userId];
    }

    const { rows: updatedRows } = await pool.query(
      'UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *',
      [newLikes, id]
    );

    res.json(updatedRows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating like' });
  }
});

// Get comments for a post
router.get('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows: comments } = await pool.query(
      'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC',
      [id]
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

// Add comment to a post
router.post('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, user } = req.body;
    
    // Check if post exists
    const { rows: postRows } = await pool.query(
      'SELECT id FROM posts WHERE id = $1',
      [id]
    );

    if (postRows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const { rows } = await pool.query(
      'INSERT INTO comments (text, user, post_id) VALUES ($1, $2, $3) RETURNING *',
      [text, JSON.stringify(user), id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
});

export default router; 
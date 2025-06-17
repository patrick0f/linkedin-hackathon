import express from 'express';
import { supabase } from '../lib/db';
import { IPost } from '../models/post.model';
import { IComment } from '../models/comment.model';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts_activity')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { post_text, user_id, picture_link, comments, num_of_likes } = req.body;
    const { data, error } = await supabase
      .from('posts_activity')
      .insert([
        {
          user_id,
          post_text,
          "Picture link": picture_link,
          Comments: comments || [],
          num_of_likes: num_of_likes || 0
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

// Get posts by user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { data: posts, error } = await supabase
      .from('posts_activity')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user posts' });
  }
});

// Update post likes
router.patch('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'increment' or 'decrement'
    
    const { data: currentPost, error: fetchError } = await supabase
      .from('posts_activity')
      .select('num_of_likes')
      .eq('id', id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    const newLikeCount = action === 'increment' 
      ? (currentPost.num_of_likes || 0) + 1
      : Math.max(0, (currentPost.num_of_likes || 0) - 1);

    const { data: updatedPost, error: updateError } = await supabase
      .from('posts_activity')
      .update({ num_of_likes: newLikeCount })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post likes' });
  }
});

// Get comments for a post
router.get('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

// Add comment to post
router.post('/:id/comment', async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    
    const { data: currentPost, error: fetchError } = await supabase
      .from('posts_activity')
      .select('Comments')
      .eq('id', id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    const currentComments = currentPost.Comments || [];
    const newComments = [...currentComments, comment];

    const { data: updatedPost, error: updateError } = await supabase
      .from('posts_activity')
      .update({ Comments: newComments })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
});

export default router; 
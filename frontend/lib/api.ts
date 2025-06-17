const API_URL = 'http://localhost:5000';

export const createPost = async (post_text: string, user_id: string, picture_link?: string) => {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      post_text, 
      user_id, 
      picture_link,
      comments: [],
      num_of_likes: 0
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  
  return response.json();
};

export const likePost = async (postId: string, action: 'increment' | 'decrement') => {
  const response = await fetch(`${API_URL}/api/posts/${postId}/like`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update like');
  }
  
  return response.json();
};

export const addComment = async (postId: string, comment: string) => {
  const response = await fetch(`${API_URL}/api/posts/${postId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ comment }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add comment');
  }
  
  return response.json();
};

export const getPosts = async () => {
  const response = await fetch(`${API_URL}/api/posts`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
};

export const getUserPosts = async (userId: string) => {
  const response = await fetch(`${API_URL}/api/posts/user/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user posts');
  }
  
  return response.json();
}; 
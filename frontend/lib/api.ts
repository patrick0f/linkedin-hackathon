const API_URL = 'http://localhost:5000';

export const createPost = async (text: string, imageUrl: string) => {
  const response = await fetch(`${API_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: text, imageUrl }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  
  return response.json();
}; 
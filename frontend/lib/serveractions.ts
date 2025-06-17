import { getPosts, createPost, addComment } from './api';

export const getAllPosts = async () => {
  try {
    const posts = await getPosts();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const createPostAction = async (formData: FormData) => {
  try {
    const post_text = formData.get('inputText') as string;
    const user_id = formData.get('user_id') as string;
    const picture_link = formData.get('picture_link') as string;
    
    if (!post_text || !user_id) {
      throw new Error('Missing required fields');
    }
    
    const post = await createPost(post_text, user_id, picture_link);
    return post;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const createCommentAction = async (formData: FormData) => {
  try {
    const comment = formData.get('comment') as string;
    const postId = formData.get('postId') as string;
    
    if (!comment || !postId) {
      throw new Error('Missing required fields');
    }
    
    const result = await addComment(postId, comment);
    return result;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const deletePostAction = async (formData: FormData) => {
  try {
    const postId = formData.get('postId') as string;
    const userId = formData.get('userId') as string;
    
    if (!postId || !userId) {
      throw new Error('Missing required fields');
    }
    
    // Note: You'll need to add a deletePost function to your backend API
    // For now, this is a placeholder
    console.log('Delete post action called for:', postId, 'by user:', userId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}; 
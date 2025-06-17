/**
 * SocialOptions Component
 * 
 * A component that provides social interaction options for posts including likes, comments,
 * reposts, and sharing. Handles real-time updates for likes and comments.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {IPost} props.post - The post document containing likes and comments
 */
import React, { useState } from "react";
import { Button } from "./ui/button";
import { MessageCircleMore, Repeat, Send, ThumbsUp } from "lucide-react";
import { IPost } from "@/types/post";
import { useUser } from "@clerk/nextjs";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import { toast } from "react-toastify";
import { postsApi } from "@/lib/api";

interface SocialOptionsProps {
  post: IPost;
}

const SocialOptions = ({ post }: SocialOptionsProps) => {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.num_of_likes || 0);
  const [commentOpen, setCommentOpen] = useState(false);

  /**
   * Handles like/dislike functionality with optimistic updates
   * Updates the UI immediately and reverts if the API call fails
   */
  const likeOrDislikeHandler = async () => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    // Store current state for potential rollback
    const tempLiked = liked;
    const tempLikes = likes;
    
    // Optimistically update UI
    const newLikeCount = liked ? likes - 1 : likes + 1;
    setLiked(!liked);
    setLikes(newLikeCount);

    try {
      // Update like status on server
      const action = liked ? 'decrement' : 'increment';
      const updatedPost = await postsApi.likePost(post.id, action);
      
      // Update with server response
      setLikes(updatedPost.num_of_likes);
    } catch (error) {
      // Rollback on error
      setLiked(tempLiked);
      setLikes(tempLikes);
      toast.error("Failed to update like status");
    }
  };

  return (
    <div>
      <div className="text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-300">
        {likes > 0 && (
          <p className="text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer">
            {likes} likes
          </p>
        )}
        {post.Comments && post.Comments.length > 0 && (
          <p
            onClick={() => setCommentOpen(!commentOpen)}
            className="text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer"
          >
            {post.Comments.length} message
          </p>
        )}
      </div>
      <div className="flex items-center m-1 justify-between">
        <Button
          onClick={likeOrDislikeHandler}
          variant={"ghost"}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <ThumbsUp className={`${liked && "fill-[#378FE9]"}`} />
          <p className={`${liked && "text-[#378FE9]"}`}>Like</p>
        </Button>
        <Button
          onClick={() => setCommentOpen(!commentOpen)}
          variant={"ghost"}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <MessageCircleMore />
          <p>Message</p>
        </Button>
        <Button
          variant={"ghost"}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <Repeat />
          <p>Repost</p>
        </Button>
        <Button
          variant={"ghost"}
          className="flex items-center gap-1 rounded-lg text-gray-600 hover:text-black"
        >
          <Send />
          <p>Send</p>
        </Button>
      </div>
      {commentOpen && (
        <div className="p-4">
          <CommentInput postId={post.id} />
          <Comments post={post} />
        </div>
      )}
    </div>
  );
};

export default SocialOptions;

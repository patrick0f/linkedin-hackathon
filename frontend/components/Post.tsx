"use client";
import React from "react";
import ProfilePhoto from "./shared/ProfilePhoto";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { IPost } from "@/types/post";
import PostContent from "./PostContent";
import SocialOptions from "./SocialOptions";
import ReactTimeago from "react-timeago";
import { deletePostAction } from "../lib/serveractions";

const Post = ({ post }: { post: IPost }) => {
  const { user } = useUser();
  // Note: You'll need to fetch user details separately since posts_activity only has user_id
  const loggedInUser = user?.id === post?.user_id;

  return (
    <div className="bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300">
      <div className=" flex gap-2 p-4">
        <ProfilePhoto src={user?.imageUrl || "./default-avatar.png"} />
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-sm font-bold">
              {user?.firstName} {user?.lastName}{" "}
              {loggedInUser && (
                <Badge variant={"secondary"} className="ml-2">
                  You
                </Badge>
              )}
            </h1>
            <p className="text-xs text-gray-500">
              @{user?.username || "username"}
            </p>

            <p className="text-xs text-gray-500">
              {post.created_at && <ReactTimeago date={new Date(post.created_at)} />}
            </p>
          </div>
        </div>
        <div>
          {loggedInUser && (
            <Button
              onClick={async () => {
                try {
                  const formData = new FormData();
                  formData.append('postId', post.id);
                  formData.append('userId', user.id);
                  await deletePostAction(formData);
                } catch (error) {
                  console.error('Error deleting post:', error);
                }
              }}
              size={"icon"}
              className="rounded-full"
              variant={"outline"}
            >
              <Trash2 />
            </Button>
          )}
        </div>
      </div>
      <PostContent post={post} />
      <SocialOptions post={post} />
    </div>
  );
};

export default Post;

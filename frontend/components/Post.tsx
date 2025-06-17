"use client";
import React from "react";
import ProfilePhoto from "./shared/ProfilePhoto";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { IUser, IPost } from "@/types/post";
import PostContent from "./PostContent";
import SocialOptions from "./SocialOptions";
import ReactTimeago from "react-timeago";
import { deletePostAction } from "@/lib/serveractions";

const Post = ({ post, user: postUser }: { post: IPost, user: IUser }) => {
  const { user } = useUser();
  const fullName = postUser.firstName + " " + postUser.lastName;
  const loggedInUser = user?.id === postUser.userId;

  return (
    <div className="bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300">
      <div className=" flex gap-2 p-4">
        <ProfilePhoto src={postUser.profilePhoto} />
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-sm font-bold">
              {fullName}{" "}
              <Badge variant={"secondary"} className="ml-2">
                You
              </Badge>
            </h1>
            <p className="text-xs text-gray-500">
              @{user?.username || "username"}
            </p>

            <p className="text-xs text-gray-500">
              <ReactTimeago date={new Date(post.created_at || '')} />
            </p>
          </div>
        </div>
        <div>
          {loggedInUser && (
            <Button
              onClick={() => {
                const formData = new FormData();
                formData.append('id', post.id);
                const res = deletePostAction(formData);
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

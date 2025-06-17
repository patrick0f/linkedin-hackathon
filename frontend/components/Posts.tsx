import React from 'react'
import Post from './Post'
import { IPost, IUser } from '@/types/post'

const Posts = ({ posts, users }: { posts: IPost[], users: IUser[] }) => {
  
  return (
    <div>
      {
        posts?.map((post) => {
          const user = users.find(u => u.userId === post.user_id);
          if (!user) return null; // or a fallback UI
          return (
            <Post key={post.id} post={post} user={user} />
          )
        })
      }
    </div>
  )
}

export default Posts
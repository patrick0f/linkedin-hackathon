import React from 'react'
import Post from './Post'
import { IPost } from '@/types/post'

const Posts = ({ posts }: { posts: IPost[] }) => {
  
  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts
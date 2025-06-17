import React from 'react'
import PostInput from './PostInput'
import Posts from './Posts'
import { getAllPosts, getAllUsers } from '../lib/serveractions';

const Feed = async ({user}:{user:any}) => {
    const userData = JSON.parse(JSON.stringify(user));
    const posts = await getAllPosts();
    const users = await getAllUsers();
    
  return (
    <div className='flex-1'>
        <PostInput user={userData}/>
        <Posts posts={posts!} users={users!}/>
    </div>
  )
}

export default Feed
import { IPost } from '@/types/post'
import React from 'react'
import Comment from './Comment'
import { useUser } from '@clerk/nextjs'

const Comments = ({post}:{post:IPost}) => {
  const { user } = useUser();
  
  return (
    <div> 
        {
            post?.Comments?.map((comment: string, index: number)=>{
                return (
                    <Comment key={index} comment={comment} user={user}/>
                )
            })
        } 
    </div>
  )
}

export default Comments
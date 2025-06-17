import { IPost } from '../types/post'
import React from 'react'
import Comment from './Comment' 
const Comments = ({post}:{post:IPost}) => {
  return (
    <div> 
        {
            post?.Comments?.map((comment: any)=>{
                return (
                    <Comment key={comment.id} comment={comment}/>
                )
            })
        } 
    </div>
  )
}

export default Comments
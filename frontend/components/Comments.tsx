import { IPost } from '../types/post'
import React from 'react'

const Comments = ({post}:{post:IPost}) => {
  return (
    <div> 
        {
            post?.Comments?.map((comment: string, index: number)=>{
                return (
                    <div key={index} className='flex gap-2 my-4'>
                        <div className='flex flex-1 justify-between p-3 bg-[#F2F2F2]'>
                            <div>
                                <p className='my-2'>{comment}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        } 
    </div>
  )
}

export default Comments
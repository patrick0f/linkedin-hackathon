import { IPost } from '@/types/post'
import Image from 'next/image'
import React from 'react'

const PostContent = ({ post }: { post: IPost }) => {
  return (
    <div className='my-3'>
      <p className='my-3 px-4'>{post?.post_text}</p>
      {
        post?.["Picture link"] && (
          <Image
            src={post["Picture link"]}
            width={500}
            height={500}
            alt="post-image"
            className='w-full mx-auto'
          />
        )
      }
    </div>
  )
}

export default PostContent
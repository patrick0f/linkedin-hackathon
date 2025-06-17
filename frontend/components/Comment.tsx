import React from 'react'
import ProfilePhoto from './shared/ProfilePhoto'
import ReactTimeago from 'react-timeago'

const Comment = ({ comment, user }: { comment: string; user: any }) => {
    return (
        <div className='flex gap-2 my-4'>
            <div className='mt-2'>
                <ProfilePhoto src={user?.imageUrl || "./default-avatar.png"} />
            </div>
            <div className='flex flex-1 justify-between p-3 bg-[#F2F2F2]'>
                <div>
                    <h1 className='text-sm font-medium'>{`${user?.firstName} ${user?.lastName}`}</h1>
                    <p className='tex-xm text-gray-500'>@{user?.username}</p>
                    <p className='my-2'>{comment}</p>
                </div>
                <div>
                    <p className='text-xs text-gray-500'>
                        <ReactTimeago date={new Date()} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Comment
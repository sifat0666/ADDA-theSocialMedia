import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore'
import { IUser } from '../types';
import Discover from './Discover'
import NoResult from './NoResult'
import Image from 'next/image'

interface Content {
  caption: string;
  content: {
    asset: {
      _id: string;
      url: string;
    };
  };
  _id: string;
  postedBy: {
    _id: string;
    userName: string;
    image: string;
  };
  likes: {
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _ref: string;
    };
  }[];
  userId: string;
}

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
  post: Content
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({ comment, setComment, addComment, comments, isPostingComment, post }: IProps) => {

  const {userProfile, allUsers} = useAuthStore()


  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {comments?.length > 0 ? (
                    post.comments?.map((item: IComment, idx: number) => (
                      <>
                        {allUsers?.map(
                          (user: IUser) =>
                            user._id === (item.postedBy._ref! || item.postedBy._id) && (
                              <div className=' p-2 items-center' key={idx}>
                                <Link href={`/profile/${user._id}`}>
                                  <div className='flex items-start gap-3'>
                                    <div className='w-12 h-12'>
                                      <Image
                                        width={48}
                                        height={48}
                                        className='rounded-full cursor-pointer'
                                        src={user.image}
                                        alt='user-profile'
                                        // layout='responsive'
                                      />
                                    </div>
          
                                    <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                                      {user.userName}{' '}
                                      <GoVerified className='text-blue-400' />
                                    </p>
                                  </div>
                                </Link>
                                <div>
                                  <p className='-mt-5 ml-16 text-[16px] mr-8'>
                                    {item.comment}
                                  </p>
                                </div>
                              </div>
                            )
                        )}
                      </>
                    ))
        ) : (
          <NoResult text='No comments yet' />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
          <form onSubmit={()=> {}} className='flex gap-4'> 
            <input onChange={e => setComment(e.target.value)} value={comment} placeholder='Add a comment' className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-gray-300 flex-1 rounded-lg' />
            <button className='text-md text-gray-400' onClick={addComment}>Sumbit</button>
          </form>

        </div>
      )}
    </div>
  )
}

export default Comments
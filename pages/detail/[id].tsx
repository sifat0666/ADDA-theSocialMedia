import axios from 'axios';
import React, { useRef, useState } from 'react'
import { BASE_URL } from '../../utils';
// import { getServerSideProps } from 'next';
import { Content } from '../../types';
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheckLg, BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { isImage } from '../../utils/isImage';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

interface IProps{
  postDetails: Content
}


const Detail = ({postDetails}: IProps) => {


  const router = useRouter()

  const {userProfile}: any = useAuthStore()

  const [post, setPost] = useState(postDetails)

  const [comment, setComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)



  const handleLike = async (like: boolean) => {



    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });


      setPost({ ...post, likes: res.data.likes });
    }

  };


  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: res.data.comments });
        setComment('');
        setIsPostingComment(false);
      }
    }
  };




  if(!post) return null


  return (
    <div className='absolute top-0 left-0 flex flex-wrap w-full bg-white lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center '> 
        <div className='absolute z-50 flex gap-6 top-6 left-2 lg:left-6'>
          <p className='cursor-pointer' onClick={()=> router.back()}><MdOutlineCancel className='text-white text-[30px]' /></p>
        </div>
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            {isImage(post.content.asset.url) ? (
                <img src={post.content.asset.url} alt="" className='object-contain h-full' />
            ) : (
                <video
                    src={post.content.asset.url}
                    loop
                    controls
                    className='h-full cursor-pointer'
                ></video>
            )}
          </div>
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]" >
        <div className="mt-10 lg:mt-20">
           <Link href={`/profile/${post.postedBy._id}`}>
                <div className='flex w-full gap-4 pl-10 mb-4 bg-white cursor-pointer'>
                  <Image
                    width={60}
                    height={60}
                    alt='user-profile'
                    className='rounded-full'
                    src={post.postedBy.image}
                  />
                  <div>
                    <div className='flex items-center justify-center gap-2 text-xl font-bold tracking-wider lowercase'>
                      {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                      <GoVerified className='text-xl text-blue-400' />
                    </div>
                    <p className='text-md'> {post.postedBy.userName}</p>
                  </div>
                </div>
              </Link>
              <p className='px-10 text-lg text-gray-600'>{post.caption}</p>
              <div className="px-10 mt-10">
                {userProfile && (
                  <LikeButton
                    likes={post.likes}
                    handleLike={() => handleLike(true)}
                    handleDislike={() => handleLike(false)}
                  />
                )}
                <p className='font-semibold text-md '>{post.likes?.length || 0} likes</p>
              </div>
              <Comments
                comment={comment}
                setComment={setComment}
                addComment={addComment}
                isPostingComment={isPostingComment}
                comments={post.comments}
                post= {post}
              />
        </div>
      </div>
    </div>
  )
}



export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: res.data },
  };
};


export default Detail
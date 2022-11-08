import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { Content } from '../types'
import {GoVerified} from 'react-icons/go'
// import Discover from './Discover'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'

interface IProps{
    post: Content
}

function isImage(url: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}



const ContentCard = ({post}: IProps) => {


    const [isHover, setIsHover] = useState<boolean>(false)
    const [playing, setPlaying] = useState<boolean>(false)
    const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false)

    const videoRef = useRef<HTMLVideoElement>(null)


    const onVideoPress = () => {
        if (playing) {
        videoRef?.current?.pause();
        setPlaying(false);
        } else {
        videoRef?.current?.play();
        setPlaying(true);
        }
    };

  return (
        <div className='flex flex-col pb-6 border-b-2 border-gray-200'>
        <div>
            <div className='flex gap-3 p-2 font-semibold rounded cursor-pointer'>
                <div className='w-10 h-10 md:w-16 md:h-16'>
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <>
                        <Image
                            width={62}
                            height={62}
                            className='rounded-full'
                            src={post.postedBy.image}
                            alt='profile photo'

                        />
                        </>
                    </Link>
                </div>
                <Link href='/'>
                    <div className='flex items-center gap-2'>
                        <p className='flex items-center gap-2 font-bold md:text-md text-primary'>
                        {post.postedBy.userName}{``}
                        <GoVerified className='text-blue-400 text-md' />
                        </p>
                        <p className='hidden text-gray-500 md:block'>{post.postedBy.userName}</p>
                    </div>
                </Link>
            </div>
        </div>
        <div className="relative flex gap-4 lg:ml-20">
            <div className="rounded-3xl">
            {isImage(post.content.asset.url) ? (
                <Link href={`/detail/${post._id}`}>
                    <img
                        src={post.content.asset.url} 
                        className='object-contain lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer'
                    />
                </Link>
             ) : (
                <div onMouseEnter={()=> setIsHover(true)} onMouseLeave={()=>{}}>
                    <Link href={`/detail/${post._id}`}>
                        <video
                            loop
                            ref={videoRef}
                            src={post.content.asset.url}
                            className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
                        ></video>
                    </Link>
                    {isHover && (
                        <div className='absolute cursor-pointer bottom-3 left-5'>
                        {playing ? (
                            <button onClick={onVideoPress}>
                            <BsFillPauseFill className='text-2xl text-black lg:text-4xl' />
                            </button>
                        ) : (
                            <button onClick={onVideoPress}>
                            <BsFillPlayFill className='text-2xl text-black lg:text-4xl' />
                            </button>
                        )}
                        {isVideoMuted ? (
                            <button onClick={() => setIsVideoMuted(false)}>
                            <HiVolumeOff className='text-2xl text-black lg:text-4xl' />
                            </button>
                        ) : (
                            <button onClick={() => setIsVideoMuted(true)}>
                            <HiVolumeUp className='text-2xl text-black lg:text-4xl' />
                            </button>
                        )}
                        </div>
                    )}
                </div>
            )}
            
            </div>
        </div>
    </div>
  )
}

export default ContentCard
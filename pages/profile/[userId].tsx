import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import ContentCard from '../../components/ContentCard';
import NoResult from '../../components/NoResult';
import { IUser, Content } from '../../types';
import { BASE_URL } from '../../utils';

interface IProps {
  data: {
    user: IUser;
    userVideos: Content[];
    userLikedVideos: Content[];
  };
}

const Profile = ({ data }: IProps) => {

  const [showUserContent, setShowUserContent] = useState<Boolean>(true);
  const [contentList, setContentList] = useState<Content[]>([]);

  const { user, userVideos, userLikedVideos } = data;
  const videos = showUserContent ? 'border-b-2 border-black' : 'text-gray-400';
  const liked = !showUserContent ? 'border-b-2 border-black' : 'text-gray-400';

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserContent) {
        setContentList(userVideos);
      } else {
        setContentList(userLikedVideos);
      }
    };

    fetchVideos();
  }, [showUserContent, userLikedVideos, userVideos]);

  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            width={120}
            height={120}
            className='rounded-full'
            src={user.image}
            alt='user-profile'
          />
        </div>

        <div>
          <div className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
            <span>{user.userName.replace(/\s+/g, '')} </span>
            <GoVerified className='text-blue-400 md:text-xl text-md' />
          </div>
          <p className='text-sm font-medium'> {user.userName}</p>
        </div>
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
          <p className={`text-xl font-semibold cursor-pointer ${videos} mt-2`} onClick={() => setShowUserContent(true)}>
            Videos
          </p>
          <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserContent(false)}>
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
          {contentList.length > 0 ? (
            contentList.map((post: Content, idx: number) => (
              <ContentCard key={idx} post={post} />
            ))
          ) : (
            <NoResult
              text={`No ${showUserContent ? '' : 'Liked'} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);
  
  return {
    props: { data: res.data },
  };
};
export default Profile;

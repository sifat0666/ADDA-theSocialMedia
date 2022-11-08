import axios from 'axios';
import React, { useEffect } from 'react'
import { BsCheckLg } from 'react-icons/bs';
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';

const LikeButton = ({ likes, handleDislike, handleLike}: any) => {

  const [liked, setLiked] = React.useState(false)
  const {userProfile}: any = useAuthStore()

  

  // ('likes array: ' , likes)

  // let filterLikes = likes.filter((item: any) => item._ref === userProfile?._id);
  // ("🚀 ~ file: LikeButton.tsx ~ line 16 ~ LikeButton ~ filterLikes", filterLikes)

  // useEffect(()=>{
  //   ('use effect')
  // }, [filterLikes])

  let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [filterLikes, likes]);

  





  return (
    <div className='gap-6'>
      <div className="flex flex-col items-center justify-center mt-4 cursor-pointer"> 
        {liked ? (
          <div 
              className='p-2 text-red-500 rounded-full bg-primary md:p-4' 
              onClick={handleDislike}
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div 
            className='p-2 text-black rounded-full bg-primary md:p-4' 
            onClick={handleLike}
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='font-semibold text-md '>{likes?.length || 0}</p>
      </div>
    </div>
  )
}

export default LikeButton
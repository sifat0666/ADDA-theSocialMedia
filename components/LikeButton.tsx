import axios from 'axios';
import React, { useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';

const LikeButton = ({handleLike, likes}: any) => {

  const [liked, setLiked] = React.useState(false)
  const {userProfile}: any = useAuthStore()

  // let filterLikes = likes.filter((item: any) => item._ref === userProfile?._id);

  // const handleLike = async (like: boolean) => {
  //   setLiked(!liked)
  //   if(userProfile){
  //     const res = await axios.put(`${BASE_URL}/api/like`, {
  //       userId: userProfile._id,
  //       postId: post._id,
  //       like
  //     })
  //   }
  // }
  // console.log(likes)
  // console.log('fileter', filterLikes.length)

  // useEffect(() => {
  //   if (filterLikes?.length > 0) {
  //     setLiked(false);
  //   } else {
  //     setLiked(true);
  //   }
  // }, [filterLikes, likes]);


  return (
    <div className='gap-6'>
      <div className="flex flex-col items-center justify-center mt-4 cursor-pointer"> 
        {liked ? (
          <div 
              className='p-2 text-red-500 rounded-full bg-primary md:p-4' 
              // onClick={()=>{
              //   // console.log('handld like')
              //   setLiked(prv => !prv)}
              // }
              onClick={()=>{
                setLiked(prv => !prv)
                handleLike(false)
              }}
          >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div 
            className='p-2 text-black rounded-full bg-primary md:p-4' 
            // onClick={()=>{
            //   setLiked(prv => !prv)
            // }}
            onClick={()=> {
              setLiked(prv => !prv)
              handleLike(true)
            }}
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
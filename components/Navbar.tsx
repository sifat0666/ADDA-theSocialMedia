import { GoogleLogin, googleLogout } from '@react-oauth/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import { ImCancelCircle } from 'react-icons/im'
import { createOrGetUser } from '../utils/index';
import useAuthStore from '../store/authStore';
import {IoMdAdd} from 'react-icons/io'
import { AiOutlineLogout } from 'react-icons/ai';


const Navbar = () => {


  //i dont wanna type zustand
  const {userProfile, addUser, removeUser} = useAuthStore() as any
  console.log("🚀 ~ file: Navbar.tsx ~ line 16 ~ Navbar ~ userProfile", userProfile)

  

  return (
    <div className='flex items-center justify-between w-full px-4 py-2 border-b-2 border-gray-200'>
        <Link href='/'>
          <span className='text-3xl cursor-pointer pl-7 bold'>ADDA</span>
        </Link>


        <div>Search</div>

        <div>
          {userProfile ? (
            <div className='flex gap-5 md:gap-10 '>
              <Link href='/upload'>
                <button className='flex items-center gap-2 px-2 font-semibold border-2 md:px-4 text-md'>
                  <IoMdAdd className='text-xl' /> {``}
                  <span className="hidden md:block"> Upload</span>
                </button>
              </Link>
              {userProfile.image && (
                    <Link href='/'>
                        <>
                        <Image
                            width={32}
                            height={32}
                            className='rounded-full cursor-pointer'
                            src={userProfile.image}
                            alt='profile photo'
                            // layout='responsive'
                        />
                        </>
                    </Link>
              )}
              <button>
                <AiOutlineLogout 
                  color='red' 
                  fontSize={21} 
                  onClick={()=>{
                    googleLogout()
                    removeUser()
                  }} 
                />
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(res)=>createOrGetUser(res, addUser)}
              onError={()=>console.log('error')}
            />
          )}
        </div>

    </div>
  )
}

export default Navbar
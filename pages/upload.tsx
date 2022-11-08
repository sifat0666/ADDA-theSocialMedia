import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '../utils/constants';
import axios from 'axios';

import { BASE_URL } from '../utils';
import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore';
import { BsCheckLg } from 'react-icons/bs';

function isImage(url: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

const Upload = () => {

    const router = useRouter()

    const userProfile: any = useAuthStore((state) => state.userProfile);


    useEffect(() => {
        if (!userProfile) router.push('/');
    }, [userProfile, router]);

    const [loading, setLoading] = useState<boolean>(false)
    const [content, setContent] = useState<SanityAssetDocument | undefined>()
    const [wrongFileType, setWrongFileType] = useState<boolean>(false)
    const [caption, setCaption] = useState('')
    const [topic, setTopic] = useState(topics[0].name)
    const [savingPost, setSavingPost] = useState(false)

    console.log(loading)

    
  const uploadContent = async (e: any) => {
    const selectedFile = e.target.files[0];

    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg', 'image/jpeg', 'image/gif', 'image/png', 'image/jpg'];

    // uploading asset to sanity
    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setLoading(true);

      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setContent(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };


    const handlePost = async () => {
    if (caption && content?._id && topic) {
      setSavingPost(true);

      const data = {
        _type: 'post',
        caption,
        content: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: content?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic,
      };

      await axios.post(`${BASE_URL}/api/post`, data);

      console.log('done')
        
      router.push('/');
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setContent(undefined);
    setCaption('');
    setTopic('');
  };

  return (
    <div className='absolute left-0 flex w-full h-full top[60px] mb-10 pt-10 lg:pt-20 bg-gray-100 justify-center'>
      <div className='bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6'>
            <div>
                <div>
                    <p className='text-2xl font-bold'>Upload Content</p>
                    <p className='mt-1 text-gray-400 text-md'>Post Something to Your Account</p>
                </div>
                <div className=' border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center  outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:border-blue-200 hover:bg-gray-100'>
                    {loading ? (
                        <p>Uploading...</p>
                    ) : (
                        <div>
                            {content ? (
                                <div>

                                {isImage(content.url) ? (
                                    <img src={content.url} alt="" />
                                ) : (
                                    <video
                                        src={content.url}
                                        loop
                                        controls
                                        className='rounded-xl h-[450px] mt-16 bg-black'
                                    ></video>
                                )}
                                </div>
                            ) : (
                                <label className='cursor-pointer'>
                                    <div className='flex flex-col items-center justify-center h-full'>
                                        <div className='flex flex-col items-center justify-center'>
                                            <p>
                                                <FaCloudUploadAlt className='text-6xl text-gray-300' />
                                            </p>
                                            <p className='text-xl font-semibold'>
                                                Upload
                                            </p>
                                        </div>
                                        <p className='mt-10 text-sm leading-10 text-center text-gray-400'>
                                            Image or Video <br />
                            
                                        </p>
                                        <p className='p-2 mt-10 font-medium text-center text-white bg-blue-500 rounded outline-none text-md w-52'>
                                            Select File
                                        </p>
                                    </div>
                                    <input type="file" name='upload-content' id='upload-content' className='w-0 h-0' onChange={uploadContent}/>
                                </label>
                            )}
                        </div>
                    )}
                    {wrongFileType &&(
                        <p className='mt-4 text-xl font-semibold text-center text-red-400'>
                            please select an image or video
                        </p>
                    )}
                </div>

            </div>       
        <div className='flex flex-col gap-3 pb-10'>
          <label className='font-medium text-md '>Caption</label>
          <input
            type='text'
            onChange={e => setCaption(e.target.value)}
            className='p-2 border-2 border-gray-200 rounded outline-none lg:after:w-650 text-md'
            required
          />
          <label className='font-medium text-md '>Choose a topic</label>

          <select
             onChange={e => setTopic(e.target.value)}
            className='p-2 capitalize border-2 border-gray-200 rounded outline-none cursor-pointer lg:w-650 text-md lg:p-4'
          >
            {topics.map((topic) =>(
                <option key={topic.name}>
                    {topic.name}
                    
                </option>
            ))}

          </select>
          <div className='flex gap-6 mt-10'>
            <button
               onClick={handleDiscard}
              type='button'
              className='p-2 font-medium border-2 border-gray-300 rounded outline-none text-md w-28 lg:w-44'
            >
              Discard
            </button>
            <button
                onClick={handlePost}
              type='button'
              className='p-2 font-medium text-white bg-blue-500 rounded outline-none text-md w-28 lg:w-44'
            >
                {loading ? 'loading' : 'Post'}

            </button>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Upload
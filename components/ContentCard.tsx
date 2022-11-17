import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Content } from "../types";
import { GoVerified } from "react-icons/go";

interface IProps {
  post: Content;
}

function isImage(url: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

const ContentCard = ({ post }: IProps) => {
  return (
    <div className="flex flex-col pb-6 border-b-2 border-gray-200">
      <div>
        <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
          <div className="w-10 h-10 md:w-16 md:h-16">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                />
              </>
            </Link>
          </div>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 font-bold md:text-md text-primary">
                {post.postedBy.userName}
                {``}
                <GoVerified className="text-blue-400 text-md" />
              </p>
              <p className="hidden text-gray-500 md:block">
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="relative flex gap-4 lg:ml-20">
        <div className="rounded-3xl">
          <p className="text-sm p-3 border-b-2">{post.caption}</p>
          {isImage(post.content.asset.url) ? (
            <Link href={`/detail/${post._id}`}>
              <img
                src={post.content.asset.url}
                className="object-contain lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer"
              />
            </Link>
          ) : (
            <Link href={`/detail/${post._id}`}>
              <video
                loop
                src={post.content.asset.url}
                className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              ></video>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;

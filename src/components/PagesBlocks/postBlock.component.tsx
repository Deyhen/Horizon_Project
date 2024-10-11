'use client';

import { Post } from '@/src/store/posts/types';
import Image from 'next/image';
import defaultImg from '@/public/images/defaultPostsImg.png';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { deletePost } from '@/src/store/posts/actions';
import { useState } from 'react';

export const PostBlock = ({ title, content, id, img }: Post) => {
  const postImage = img ? process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + img : defaultImg;
  const [fullContent, setFullContent] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);

  const handlePostDelete = () => {
    dispatch(deletePost(id));
  };

  return (
    <div 
      className={`relative mb-12 mx-16 rounded-b-3xl bg-white shadow-2xl shadow-element md:shadow-none  rounded-[4rem] px-8 py-4 `}
      >
    <div className="image-container max-h-fit " style={{ float: 'left', marginRight: '16px' }}>
      <Image
        src={postImage}
        width={200}
        height={200}
        className='w-full max-h-fit rounded-[2rem]'
        alt={`${title} image`}
      />
    </div>
    <span className={`text-xl w-fit h-1`}>
      {!fullContent 
        ? content.length > 300 
          ? content.slice(0, 300) + '...' 
          : content
        : content+ content}
      </span>

      {user.role == 'admin' && (
        <button className="absolute right-8 top-8 text-element" onClick={handlePostDelete}>
          X
        </button>
      )}

      {/* Кнопка переключения отображения полного текста */}
      <span className='text-white text-lg absolute -bottom-3 -right-2 z-10 cursor-pointer' onClick={() => setFullContent(!fullContent)}>
        {!fullContent ? 'Детальніше' : 'Сховати'}
      </span>

      {/* SVG-кнопка */}
      <svg width="200" height="100" viewBox="0 0 160 70" xmlns="http://www.w3.org/2000/svg" className='absolute -bottom-12 -right-12 cursor-pointer' onClick={() => setFullContent(!fullContent)}>
        <path d="M10 20 H110 A30 30 0 0 1 140 35 A30 30 0 0 1 110 50 H40 A20 20 0 0 1 20 35 Q5 35 10 20 Z" fill="#f16c26" />
        <circle cx="18" cy="45" r="5" fill="#f16c26" />
      </svg>
    </div>
  );
};
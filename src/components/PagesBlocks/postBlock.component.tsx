'use client';

import { Post } from '@/src/store/posts/types';
import Image from 'next/image';
import defaultImg from '@/public/images/defaultPostsImg.png';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { deletePost } from '@/src/store/posts/actions';
import { MyButton } from '../Custom/myButton/my-button.component';

export const PostBlock = ({ title, content, id, img }: Post) => {
  const postImage = img ? process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + img : defaultImg;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const handlePostDelete = () => {
    dispatch(deletePost(id));
  };

  return (
    <div className="relative mb-20 flex flex-col items-center min-w-[70%] mx-16 rounded-b-3xl bg-white shadow-2xl min-h-[700px] shadow-element  md:shadow-none snap-center">
      <div className='relative w-full h-60'>
        <h1 className={`absolute left-0 right-0 mx-auto translate-y-full z-20 w-full rounded-t-3xl px-4 py-1.5 text-center
                       text-sm text-first md:-top-5 md:w-1/3 md:min-w-fit md:rounded-3xl md:text-3xl bg-white/50`}>
          {title}
        </h1>
        <Image
          src={postImage}
          alt={`${title} image`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          draggable={false}
        />
      </div>
      <span className="my-4 text-2xl px-8">{content.length > 400 ? content.slice(0, 400) + '...' : content}</span>
      {user.role == 'admin' && (
        <button className="absolute right-8 top-8 text-element" onClick={handlePostDelete}>
          X
        </button>
      )}
      <Link
        href={`/posts/${id}`}
        className="absolute -bottom-3 -right-0"
      >
        <MyButton className='rounded-3xl text-xl font-bold px-4 py-2'>
          <span>Детальніше</span>
        </MyButton>
      </Link>
    </div>
  );
};

// <svg width="160" height="70" viewBox="0 0 160 70" xmlns="http://www.w3.org/2000/svg">
//   <path d="M10 20 H110 A30 30 0 0 1 140 35 A30 30 0 0 1 110 50 H40 A20 20 0 0 1 20 35 Q5 35 10 20 Z" fill="#f16c26"/>
//   <circle cx="18" cy="45" r="5" fill="#f16c26"/>
// </svg>
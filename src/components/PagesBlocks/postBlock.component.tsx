'use client';

import { Post } from '@/src/store/posts/types';
import Image from 'next/image';
import defaultImg from '@/public/images/defaultPostsImg.png';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { deletePost } from '@/src/store/posts/actions';

export const PostBlock = ({ title, content, id, img }: Post) => {
  const postImage = img ? process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + img : defaultImg;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const handlePostDelete = () => {
    dispatch(deletePost(id));
  };

  return (
    <div className="relative mb-20 flex flex-col items-center rounded-b-3xl bg-white p-6 shadow-2xl shadow-element md:flex-row md:rounded-[4rem] md:shadow-none">
      <h1 className="absolute -top-8 left-0 right-0 mx-auto w-full rounded-t-3xl bg-[#e77f2a] px-4 py-1.5 text-center text-sm text-white md:-top-5 md:w-1/3 md:min-w-fit md:rounded-3xl md:text-xl">
        {title}
      </h1>
      <Image
        className={`mr-4 h-60 w-60`}
        src={postImage}
        alt={`${title} image`}
        width={400}
        height={400}
      />
      <span className="my-4">{content.length > 400 ? content.slice(0, 400) + '...' : content}</span>
      {user.role == 'admin' && (
        <button className="absolute right-8 top-8 text-element" onClick={handlePostDelete}>
          X
        </button>
      )}
      <Link
        href={`/posts/${id}`}
        className="absolute -bottom-5 -right-2 rounded-3xl bg-[#e77f2a] p-4 text-lg text-white md:text-xl"
      >
        Детальніше
      </Link>
    </div>
  );
};

'use client';

import { useEffect, useRef, useState } from 'react';
import { PostBlock } from '../components/PagesBlocks/postBlock.component';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getPosts } from '../store/posts/actions';
import { Loader } from '../components/Custom/loader/loader.component';

const Home = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const loading = useAppSelector((state) => state.posts.loading);
  const postsData = useAppSelector((state) => state.posts.data);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    }
  }, [loading]);


  
  return (
    <div className="w-3/4 h-full justify-center items-center">
      {loading ? (
        <Loader />
      ) : postsData.length ? (
        <div
          className={`flex flex-col  transform transition-transform duration-500 ease-in-out ${
            isVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {postsData.map((item) => (
            <PostBlock
              title={item.title}
              id={item.id}
              content={item.content}
              img={item.img}
              key={item.id}
            />
          ))}
        </div>
      ) : (
        <div className="p-4 text-3xl text-second bg-white rounded-3xl font-bold text-center">
          Список постів порожній
        </div>
      )}
    </div>
  );
};

export default Home;
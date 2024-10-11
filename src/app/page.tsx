'use client';

import { useEffect, useRef, useState } from 'react';
import { PostBlock } from '../components/PagesBlocks/postBlock.component';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getPosts } from '../store/posts/actions';
import { Loader } from '../components/Custom/loader/loader.component';

const Home = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0); 
  const [scrollLeft, setScrollLeft] = useState(0);

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


  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    

    document.body.style.userSelect = 'none';
    scrollContainerRef.current.style.cursor = 'grabbing';
  };


  const handleMouseUpOrLeave = () => {
    setIsDragging(false);

    document.body.style.userSelect = 'auto';
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 5; 
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-3/4 h-full justify-center items-center">
      {loading ? (
        <Loader />
      ) : postsData.length ? (
        <div
          className={`flex w-full overflow-hidden transform transition-transform duration-500 ease-in-out snap-x scroll-smooth snap-mandatory ${
            isVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          style={{ cursor: 'grab', transition: 'transform 0.3s ease-out' }}
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
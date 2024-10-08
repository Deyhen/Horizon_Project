'use client';

import { useEffect, useMemo } from 'react';
import { PostBlock } from '../components/PagesBlocks/postBlock.component';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getPosts } from '../store/posts/actions';
import Link from 'next/link';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const loading = useAppSelector((state) => state.posts.loading);
  const user = useAppSelector((state) => state.user.data);

  const postsData = useAppSelector((state) => state.posts.data);
  const postsList = useMemo(() => {
    return postsData.map((item) => (
      <PostBlock
        title={item.title}
        id={item.id}
        content={item.content}
        img={item.img}
        key={item.id}
      />
    ));
  }, [postsData]);

  return (
    <div className="">
      {user.role == 'admin' && <Link href={'/posts/new-post'}>add new post</Link>}
      {loading ? (
        <div>Loading...</div>
      ) : postsData.length ? (
        postsList
      ) : (
        <div>Posts list is empty</div>
      )}
    </div>
  );
};

export default Home;

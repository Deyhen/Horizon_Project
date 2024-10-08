'use client';

import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { Login } from './Login/login.component';
import { MiniProfile } from './MiniProfile/miniProfile.component';
import { useEffect } from 'react';
import { checkUser } from '@/src/store/user/actions';

export const RightBar = () => {
  const user = useAppSelector((state) => state.user.data);
  const loading = useAppSelector((state) => state.user.loading);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);
  return (
    <div className="row-start-2 mb-24 md:mt-40">
      {!loading ? !user.id ? <Login /> : <MiniProfile /> : <div>Loading...</div>}
    </div>
  );
};

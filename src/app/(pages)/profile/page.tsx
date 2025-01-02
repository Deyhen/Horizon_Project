'use client';

import { Button, Loader } from '@/src/shared/ui';
import { useAppDispatch, useAppSelector } from '@/src/store';
import { CredentialsBlock, BalanceBlock, MinecraftSkinViewer } from '@/src/modules/profile';
import { useEffect } from 'react';
import { logout } from '@/src/api';
import { useRouter } from 'next/navigation';
import { RxExit } from 'react-icons/rx';

const Profile = () => {
  const user = useAppSelector((state) => state.user.data);
  const loading = useAppSelector((state) => state.user.loading);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    !loading && !user.id && router.push('/');
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-[89vh] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative flex h-full max-h-[75vh] w-full space-x-40 pt-12">
      <RxExit
        className="absolute right-4 top-4 h-12 w-12 cursor-pointer text-secondary"
        onClick={handleLogout}
      />
      <MinecraftSkinViewer user={user} />
      <div className="flex w-1/2 flex-col items-center justify-between">
        <div className="flex w-full flex-col space-y-12">
          <CredentialsBlock user={user} />
          <BalanceBlock user={user} />
        </div>
        <div className="flex space-x-20">
          <Button>
            <span>Активувати промокод</span>
          </Button>
          <Button>
            <span>Активувати пошту</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

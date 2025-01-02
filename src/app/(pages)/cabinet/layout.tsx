'use client';

import { Loader } from '@/src/shared/ui/Loader/loader.component';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { logout } from '@/src/store/user/actions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RxExit } from 'react-icons/rx';

const CabinetLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
  if (user.id) {
    return (
      <div className="relative flex h-full w-full">
        <div className="flex grow">{children}</div>
        <RxExit
          className="absolute right-4 top-4 h-12 w-12 cursor-pointer text-secondary"
          onClick={handleLogout}
        />
      </div>
    );
  }
};

export default CabinetLayout;

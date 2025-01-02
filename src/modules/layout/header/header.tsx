'use client';

import { NavBar } from './NavBar';

import { useAppDispatch, useAppSelector } from '@/src/store';
import { Button } from '@/src/shared/ui';
import Link from 'next/link';
import { useEffect } from 'react';
import { checkUser } from '@/src/api';
import { LoginModal } from './Login/LoginModal';

export const Header = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  const user = useAppSelector((state) => state.user.data);
  return (
    <div className="flex h-[11vh] w-full items-center justify-between border-b-2 border-text_secondary px-12">
      <NavBar />
      {user.id ? (
        <Link href="/profile">
          <Button>
            <span>Особистий кабінет</span>
          </Button>
        </Link>
      ) : (
        <LoginModal />
      )}
    </div>
  );
};

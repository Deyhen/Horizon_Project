'use client';

import { NavBar } from './NavBar';

import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { Button } from '@/src/shared/ui/Button/Button.component';
import Link from 'next/link';
import { useEffect } from 'react';
import { checkUser } from '@/src/store/user/actions';
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
        <Link href="/cabinet/profile">
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

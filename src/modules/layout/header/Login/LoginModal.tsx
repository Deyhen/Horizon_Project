'use client';

import Dialog from '@/src/shared/ui/Dialog/Dialog';
import { useState } from 'react';
import { Button } from '@/src/shared/ui/Button/Button.component';
import { LoginForm } from './LoginForm/LoginForm';
import Divider from '@/src/shared/ui/Divider/Divider';
import Link from 'next/link';
import { useAppSelector } from '@/src/store/store';

export const LoginModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.user.data);

  return (
    <div className="flex h-3/4 items-center justify-center space-x-2">
      <Link href="/register">
        <Button className="max-h-fit">
          <span>Реєстрація</span>
        </Button>
      </Link>
      <Divider orientation="vertical" />
      <Button className="max-h-fit" onClick={() => setIsModalOpen(true)}>
        <span>Увійти</span>
      </Button>

      <Dialog isOpen={user.id ? false : isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center justify-center px-8">
          <span className="text-2xl font-bold text-text">Авторизація</span>
          <Divider className="mt-2" />
          <LoginForm />
        </div>
      </Dialog>
    </div>
  );
};

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, Divider } from '@/src/shared/ui';
import { LoginForm } from './LoginForm/LoginForm';
import { useAppSelector } from '@/src/store';
import { Modal } from '@/src/modules/providers';

export const LoginModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.user.data);

  const handleOpenLoginModal = () => {
    Modal.showModal({
      body: (
        <div className="flex flex-col items-center justify-center px-8">
          <span className="text-2xl font-bold text-text_secondary">Авторизація</span>
          <Divider className="mt-2" />
          <LoginForm />
        </div>
      ),
    });
  };

  return (
    <div className="flex h-3/4 items-center justify-center space-x-2">
      <Link href="/register">
        <Button className="max-h-fit">
          <span>Реєстрація</span>
        </Button>
      </Link>
      <Divider orientation="vertical" />
      <Button className="max-h-fit" onClick={handleOpenLoginModal}>
        <span>Увійти</span>
      </Button>

      {/* <Dialog isOpen={user.id ? false : isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center justify-center px-8">
          <span className="text-2xl font-bold text-text_secondary">Авторизація</span>
          <Divider className="mt-2" />
          <LoginForm />
        </div>
      </Dialog> */}
    </div>
  );
};

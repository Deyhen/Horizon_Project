'use client';

import { useAppSelector } from '@/src/store';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Hero from '/public/images/MainHero.png';
import { RegisterForm } from '@/src/modules/register';
import { Loader, Divider } from '@/src/shared/ui';

const RegistrationPage = () => {
  const router = useRouter();
  const container = useRef(null);

  const user = useAppSelector((state) => state.user.data);
  const loading = useAppSelector((state) => state.user.loading);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (user?.id) {
      router.push('/');
    }
  }, [user, router]);

  if (!isMounted || loading) {
    return (
      <div className="flex h-[75vh] w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (user.id) {
    return (
      <div className="flex items-center justify-center p-40 text-3xl">
        Ця сторінка недоступна зареєстрованим користувачам
      </div>
    );
  } else {
  }

  return (
    <div className="relative flex grow">
      <div className="mt-40 flex w-1/2 flex-col items-center justify-start px-8" ref={container}>
        <span className="text-4xl font-bold text-text">Реєстрація</span>
        <Divider className="mb-12 mt-6 bg-primary" />
        <RegisterForm />
      </div>
      <Image
        src={Hero}
        alt="hero"
        width={940}
        height={1000}
        className="absolute right-20 top-0 z-10 max-h-[89vh] w-auto object-contain"
      />
    </div>
  );
};
export default RegistrationPage;

'use client';

import { useAppSelector } from '@/src/store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Hero from '/public/images/MainHero.png';
import { RegisterForm } from '../../../modules/RegisterForm';
import Divider from '@/src/shared/ui/Divider/Divider';

const RegistrationPage = () => {
  const router = useRouter();
  const container = useRef(null);

  const user = useAppSelector((state) => state.user.data);

  useEffect(() => {
    if (user.id) {
      router.push('/');
    }
  });

  return (
    <div className="relative flex grow">
      {!user.id ? (
        <>
          <div
            className="mt-40 flex w-1/2 flex-col items-center justify-start px-8"
            ref={container}
          >
            <span className="text-text text-4xl font-bold">Реєстрація</span>
            <Divider className="mb-12 mt-6 bg-primary" />
            <RegisterForm />
          </div>
          <Image
            src={Hero}
            alt="hero"
            width={940}
            height={1000}
            className="absolute right-20 top-0 z-10 max-h-[90vh] w-auto object-contain"
          />
        </>
      ) : (
        <div className="flex items-center justify-center p-40 text-3xl">
          Ця сторінка недоступна зареєстрованим користувачам
        </div>
      )}
    </div>
  );
};
export default RegistrationPage;

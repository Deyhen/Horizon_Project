'use client';

import { useAppSelector } from '@/src/store/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const CabinetLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = useAppSelector((state) => state.user.data);
  const router = useRouter()
  

  useEffect(() => {
    if(!user.id){
      router.push('/')
    }
  })

  const handleBlockLiks = () => {
    Swal.fire({
      title: 'Нажаль, цей функціонал на даний момент недоступний',
      confirmButtonColor: '#e77f2a',
      iconColor: '#e77f2a',
      icon: 'warning',
    });
  };

  return (
    <div className="flex w-2/3 flex-col rounded-lg" style={{ background: 'radial-gradient( rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.2) 80%, rgba(255, 255, 255, 0.0) 95%)' }}>
      {user.id && (
        <>
          <div className="flex w-full items-center justify-center divide-x divide-second border-b-2 border-second font-bold">
            <Link href={'/cabinet'} className="py-2 h-full px-4 text-xl text-first hover:shadow-xl hover:bg-white/50 hover:shadow-second transition duration-300">
              {' '}
              Профіль
            </Link>
            {/* <Link href={'/cabinet/payment'} className="px-4"> */}
            <div className="py-2 h-full px-4 text-xl text-first hover:shadow-xl hover:bg-white/50 hover:shadow-second transition duration-300" onClick={handleBlockLiks}>
              Привілеї
            </div>
            {/* </Link> */}
            <Link href={'/cabinet/opportunities'} className="py-2 h-full px-4 text-xl text-first hover:shadow-xl hover:bg-white/50 hover:shadow-second transition duration-300">
              Управління акаунтом
            </Link>
          </div>
          <div className='flex justify-start items-start'>
            {children}
          </div>

        </>
      )}
    </div>
  );
};

export default CabinetLayout;

'use client';

import { useAppSelector } from '@/src/store/store';
import Link from 'next/link';

const CabinetLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = useAppSelector((state) => state.user.data);
  return (
    <div className="flex w-2/3 flex-col" style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 100%)' }}>
      {user.id && (
        <>
          <div className="flex w-full items-center justify-center divide-x divide-element border-b-2 border-element p-2">
            <Link href={'/cabinet'} className="px-4">
              {' '}
              Profile
            </Link>
            <Link href={'/cabinet/payment'} className="px-4">
              Donate
            </Link>
            <Link href={'/cabinet/opportunities'} className="px-4">
              Opportunities
            </Link>
          </div>
          {children}
        </>
      )}
    </div>
  );
};

export default CabinetLayout;

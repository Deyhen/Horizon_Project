'use client';

import { CabinetNavbar } from '@/src/modules/cabinetNavBar';
import { Loader } from '@/src/shared/ui/Loader/loader.component';
import { useAppSelector } from '@/src/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CabinetLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = useAppSelector((state) => state.user.data);
  const router = useRouter();

  useEffect(() => {
    !user.id && router.push('/');
  }, [user]);

  return user.id ? (
    <div className="flex h-full w-full">
      <div className="flex grow">{children}</div>
      <div className="flex self-center">
        <CabinetNavbar />
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CabinetLayout;

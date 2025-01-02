'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Sword from '/public/images/sword.png';
import Image from 'next/image';

export const CabinetNavBarItem = ({ href, children }: { href: string; children: string }) => {
  const router = usePathname();
  return (
    <div className="relative">
      <Image
        src={Sword}
        width={52}
        height={52}
        alt="sword image"
        className={clsx('absolute -left-24 rotate-45', {
          hidden: !(href === router),
        })}
      />
      <Link href={href} className="">
        <div
          className={clsx(
            'flex origin-right border-b-4 border-primary px-4 py-2 text-2xl font-bold transition-all duration-300 hover:scale-110',
            {
              'scale-110 text-secondary': router === href,
              'text-text': !(router === href),
            },
          )}
        >
          {children}
        </div>
      </Link>
    </div>
  );
};

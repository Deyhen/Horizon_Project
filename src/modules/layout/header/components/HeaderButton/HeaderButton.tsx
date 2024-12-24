'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './HeaderButton.module.css';
import clsx from 'clsx';

interface HeaderbuttonProps {
  title: string;
  className?: string;
  pathname: string;
}

export const HeaderButton = ({ title, className, pathname }: HeaderbuttonProps) => {
  const router = usePathname();

  return (
    <Link
      href={pathname}
      className={clsx(styles.navButton, className, {
        [styles.selectedNav]: router === pathname,
        [styles.hoveredNav]: !(router === pathname),
      })}
    >
      {title}
    </Link>
  );
};

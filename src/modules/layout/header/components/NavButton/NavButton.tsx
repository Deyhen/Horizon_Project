'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavButton.module.css';
import clsx from 'clsx';

interface NavButtonProps {
  title: string;
  className?: string;
  pathname: string;
}

export const NavButton = ({ title, className, pathname }: NavButtonProps) => {
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

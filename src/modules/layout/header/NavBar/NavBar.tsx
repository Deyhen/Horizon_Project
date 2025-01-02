import Image from 'next/image';
import { NavButton } from '../components';
import Logo from '/public/images/Logo.png';
import Link from 'next/link';

export const NavBar = () => {
  return (
    <div className="flex items-center justify-center space-x-20">
      <Link href={'/'}>
        <Image
          src={Logo}
          alt="logo"
          width={500}
          height={500}
          className="h-40 w-40 cursor-pointer"
        />
      </Link>
      <NavButton title="Головна" pathname="/" />
      <NavButton title="Правила" pathname="/rules" />
      <NavButton title="Привілеї" pathname="/privileges" />
      <NavButton title="Сервери" pathname="/servers" />
    </div>
  );
};

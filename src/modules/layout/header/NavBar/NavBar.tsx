import Image from 'next/image';
import { HeaderButton } from '../components';
import Logo from '/public/images/Logo.png';

export const NavBar = () => {
  return (
    <div className="flex items-center justify-center space-x-20">
      <Image src={Logo} alt="logo" width={500} height={500} className="h-40 w-40" />
      <HeaderButton title="Головна" pathname="/" />
      <HeaderButton title="Правила" pathname="/rules" />
      <HeaderButton title="Привілеї" pathname="/privileges" />
      <HeaderButton title="Сервери" pathname="/servers" />
    </div>
  );
};

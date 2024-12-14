import Image from 'next/image';
import Logo from '/public/images/Logo.svg';
import { HeaderButton } from './components';
import { MyButton } from '../../ui/myButton/myButton.component';

export const Header = () => {
  return (
    <div className="flex h-[10vh] w-full items-center justify-between border-b-2 border-gray-200 px-12">
      <div className="flex items-center justify-center space-x-20">
        <Image src={Logo} alt="logo" width={500} height={400} className="h-24 w-24" />
        <HeaderButton title="Головна" pathname="/" />
        <HeaderButton title="Правила" pathname="/rules" />
        <HeaderButton title="Сервери" pathname="/servers" />
      </div>
      <MyButton>
        <span>Увійти</span>
      </MyButton>
    </div>
  );
};

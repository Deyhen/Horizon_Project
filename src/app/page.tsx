'use client';

import Image from 'next/image';
import Hero from '/public/images/MainHero.png';
import WindowsLogo from '/public/images/WindowsLogo.png';
import WindowsLogoHovered from '/public/images/WindowsLogoHovered.png';
import { MyButton } from '../shared/ui/myButton/myButton.component';
import { useState } from 'react';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex w-full items-start justify-between pl-40 pr-20">
      <div className="mt-16 flex flex-col space-y-12 pl-12 pr-40">
        <span className="flex flex-col space-y-2 text-7xl font-bold text-black">
          <p>Грайте, творіть,</p>
          <p>досліджуйте,</p>
          <p>ідеальний Minecraft</p>
          <p>сервер з модами!</p>
        </span>
        <span className="text-2xl text-gray-400">
          Відкрийте для себе безмежні можливості для творчості й виживання в унікальному кубічному
          всесвіті
        </span>
        <div>
          <a href="https://launch.ukraine-horizon.online/Launcher.exe" download>
            <MyButton
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex max-w-fit items-center justify-center space-x-12 rounded-3xl">
                <span className="jusify-between flex w-full flex-col items-start text-start">
                  <p className="text-xl">Завантажити лаунчер</p>
                  <p className="text-start text-second">для Windows 32/64 bit</p>
                </span>
                <Image
                  width={80}
                  height={60}
                  src={isHovered ? WindowsLogo : WindowsLogoHovered}
                  alt={'Woops'}
                />
              </div>
            </MyButton>
          </a>
        </div>
      </div>
      <Image
        src={Hero}
        alt="hero"
        width={940}
        height={1000}
        className="z-10 max-h-[90vh] w-auto object-contain"
      />
    </div>
  );
};

export default Home;

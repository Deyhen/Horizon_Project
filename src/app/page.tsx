'use client';

import Image from 'next/image';
import Hero from '/public/images/MainHero.png';
import { Button } from '../shared/ui/Button/Button.component';
import { useState } from 'react';
import { FaWindows } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="relative flex w-full items-start justify-between pl-40 pr-20">
      <div className="mt-24 flex w-1/2 flex-col flex-wrap space-y-24 pl-12 pr-40">
        <div className="text-shadow-lg flex flex-col space-y-12">
          <span className="flex flex-col space-y-2 text-6xl font-bold text-text">
            <p>Грайте, творіть,</p>
            <p>досліджуйте,</p>
            <p>ідеальний Minecraft</p>
            <p>сервер з модами!</p>
          </span>
          <span className="text-2xl text-gray-400">
            Відкрийте для себе безмежні можливості для творчості й виживання в унікальному кубічному
            всесвіті
          </span>
        </div>
        <div className="mt-20">
          <a href="https://launch.ukraine-horizon.online/Launcher.exe" download>
            <Button>
              <div className="flex max-w-fit items-center justify-center space-x-16 rounded-3xl">
                <span className="jusify-between flex w-full flex-col items-start text-start">
                  <p className="text-xl">Завантажити лаунчер</p>
                  <p className={`text-start text-secondary`}>для Windows 32/64 bit</p>
                </span>
                <FaWindows className="h-24 w-24" />
              </div>
            </Button>
          </a>
        </div>
      </div>
      <Image
        src={Hero}
        alt="hero"
        width={920}
        height={1000}
        className="absolute right-20 top-0 z-10 max-h-[89vh] w-auto object-contain"
      />
    </div>
  );
};

export default Home;

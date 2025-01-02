'use client';

import { PrivilegeBlock } from '@/src/modules/privileges';
import { useAppSelector } from '@/src/store';
import { IoDiamond } from 'react-icons/io5';
import { GiSwordsPower } from 'react-icons/gi';
import { FaPooStorm } from 'react-icons/fa';

const Privileges = () => {
  const privileges = useAppSelector((state) => state.privileges.data.privileges);

  const icons = [
    <IoDiamond size={32} color="#F1861C" />,
    <GiSwordsPower size={32} color="#F1861C" />,
    <FaPooStorm size={32} color="#F1861C" />,
  ];

  return (
    <div className="w-full px-8">
      <div className="my-8 flex flex-col">
        <span className="py-4 text-4xl font-bold">Privileges</span>
        <span className="text-xl font-semibold">
          Welcome to our Minecraft Launcher community! To ensure a safe and enjoyable experience for
          everyone, please adhere to the following rules:
        </span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6">
        {privileges.map((privilege, index) => (
          <PrivilegeBlock
            privilegeName={privilege.name}
            responsibilities={privilege.responsobilities}
            imageName={privilege.imageName}
            cost={privilege.cost}
            privateCount={privilege.privateCount}
            privateSize={privilege.privateSize}
            icon={icons[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default Privileges;

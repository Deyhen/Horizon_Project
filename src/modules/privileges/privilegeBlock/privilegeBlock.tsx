'use client';

import Image from 'next/image';
import { ReactNode, useRef, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { useAppSelector } from '@/src/store/store';
import { BsCheck2Square } from 'react-icons/bs';

interface PrivilegeBlockProps {
  privilegeName: string;
  icon: ReactNode;
  cost: number;
  imageName: string; // Image file name
  privateSize: number;
  privateCount: number;
  responsibilities: string[];
}

export const PrivilegeBlock = ({
  privilegeName,
  icon,
  cost,
  imageName,
  privateSize,
  privateCount,
  responsibilities,
}: PrivilegeBlockProps) => {
  const [showMore, setShowMore] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const generalResponsibilities = useAppSelector(
    (state) => state.privileges.data.generalResponsibilities,
  );

  const handleClick = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div
      className="flex w-3/4 cursor-pointer flex-col rounded-3xl border border-primary px-6 py-6"
      onClick={handleClick}
    >
      <div className="flex h-full w-full items-center justify-between">
        {showMore ? (
          <IoIosArrowUp size={32} color="#F1861C" />
        ) : (
          <IoIosArrowDown size={32} color="#F1861C" />
        )}

        <div className="flex items-center justify-between space-x-8 text-3xl font-bold text-primary">
          {icon}
          <div className="flex space-x-4">
            <span>{privilegeName}</span>
            <span className="font-semibold">{cost}₴</span>
          </div>
          {icon}
        </div>

        {showMore ? (
          <IoIosArrowUp size={32} color="#F1861C" />
        ) : (
          <IoIosArrowDown size={32} color="#F1861C" />
        )}
      </div>
      <div
        style={{
          height: showMore ? `${containerRef.current?.clientHeight}px` : '0',
        }}
        className={`${showMore && 'mt-8'} space-y-2 overflow-hidden text-lg transition-all duration-300 ease-linear`}
      >
        <div ref={containerRef} className="flex max-h-fit space-x-[12rem] px-12 pb-12">
          <Image
            src={`/images/privileges/${imageName}`} // Dynamic image path
            width={400}
            height={400}
            alt={`${privilegeName} Inventory Image`}
          />

          <div className="mt-12 flex flex-col space-y-4 text-center text-primary">
            <div className="items text-center-center flex flex-col space-y-2">
              <span className="text-xl font-bold">Макс розмір привату</span>
              <span className="px-2 py-1 text-lg font-semibold">
                {privateSize}x{privateSize}
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <span className="text-xl font-bold">Макс кількість приватів</span>
              <span className="px-2 py-1 text-lg font-semibold">{privateCount}</span>
            </div>
          </div>

          <div className="mt-12 flex flex-col flex-wrap items-center space-y-2">
            <span className="text-xl font-bold text-primary">Можливості</span>
            <div className="flex flex-col divide-y divide-primary border border-primary">
              {generalResponsibilities.map((responsibility) => (
                <div className="flex items-center justify-between space-x-12 px-2 py-2">
                  <span>{responsibility}</span>
                  <BsCheck2Square
                    size={20}
                    color={
                      responsibilities.find(
                        (includedResponsibility) => responsibility === includedResponsibility,
                      )
                        ? '#F1861C'
                        : '#c9c9c9'
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

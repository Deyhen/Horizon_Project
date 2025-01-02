'use client';

import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

interface RuleBlockProps {
  title: string;
  subtitle: string;
  options: string[];
  index: number;
}

export const RuleBlock = ({ title, subtitle, options, index }: RuleBlockProps) => {
  const [showMore, setShowMore] = useState(false);
  const handleClick = () => {
    setShowMore(!showMore);
  };
  return (
    <div
      className="w-full cursor-pointer rounded-3xl bg-zinc-700 bg-opacity-90 px-6 py-6"
      onClick={handleClick}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col space-y-2">
          <span className="text-2xl font-bold text-text">{`${index}. ${title}`}</span>
          <span className="text-lg text-text_secondary">{subtitle}</span>
        </div>
        {showMore ? <IoIosArrowUp size={32} /> : <IoIosArrowDown size={32} />}
      </div>

      <div
        style={{
          height: showMore ? `${options.length * 2.5}rem` : '0',
        }}
        className={`${showMore && 'mt-4'} ml-4 space-y-2 overflow-hidden text-lg text-text transition-all duration-300 ease-linear`}
      >
        {options.map((option, subindex) => (
          <div key={option}>{`${index}.${subindex + 1}. ${option}`}</div>
        ))}
      </div>
    </div>
  );
};

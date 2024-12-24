import clsx from 'clsx';
import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const Divider = ({ orientation = 'horizontal', className }: DividerProps) => {
  return (
    <div
      className={clsx('bg-background flex items-center', className, {
        'h-full w-px': orientation === 'vertical',
        'h-px w-full': orientation === 'horizontal',
      })}
    />
  );
};

export default Divider;

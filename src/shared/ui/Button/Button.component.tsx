import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactElement } from 'react';

export const Button = ({
  onClick,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        'rounded-3xl border-4 border-secondary bg-black bg-opacity-40 px-6 py-2 text-xl font-bold text-secondary transition-all duration-300',
        'hover:text-tertiary hover:text-focus hover:scale-105 hover:border-primary hover:bg-primary',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

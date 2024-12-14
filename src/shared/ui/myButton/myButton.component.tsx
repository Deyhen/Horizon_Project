import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactElement } from 'react';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className?: string;
  children: ReactElement;
}

export const MyButton = ({ onClick, className, children, ...props }: MyButtonProps) => {
  return (
    <button
      className={clsx(
        className,
        'rounded-3xl border-4 border-first px-6 py-2 text-xl font-bold text-first transition-colors duration-300 hover:bg-first hover:text-white',
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactElement } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  className?: string;
  children: ReactElement;
}

export const Button = ({ onClick, className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        className,
        'rounded-3xl border-4 border-secondary px-6 py-2 text-xl font-bold text-secondary transition-all duration-300',
        'hover:text-tertiary hover:scale-105 hover:border-primary hover:bg-primary',
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

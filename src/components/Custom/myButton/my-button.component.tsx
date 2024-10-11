import { InputHTMLAttributes, ReactElement } from "react";

interface MyButtonProps{
    onClick?: () => void;
    className?: string;
    children: ReactElement;
}

export const MyButton = ({onClick, className, children}: MyButtonProps & InputHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button 
        className={className + ' ' + 'font-bold border-first border-2 hover:border-second hover:bg-second text-first hover:text-white px-2 py-1 transition-all duration-300'}
        onClick={onClick}
        >
            {children}
        </button>
    )
}
import { useField } from 'formik';
import { InputHTMLAttributes, useRef, useState } from 'react';
import clsx from 'clsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { InputProps } from './Input.props';

export const Input = ({
  inputStyle,
  containerStyle,
  labelStyle,
  errorStyle,
  icon,
  type,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // const handleClick = () => {
  //   inputRef.current?.focus();
  // };
  return (
    <>
      <div
        className={clsx(
          containerStyle,
          'flex w-full items-center rounded-2xl border-8 border-double bg-black bg-opacity-20 px-2 py-1 transition-colors duration-300',
          {
            'border-primary text-secondary': isFocused && !(meta.error && meta.touched),
            'border-text_secondary text-text_secondary':
              !isFocused && !(meta.error && meta.touched),
            'border-red-600 text-red-600': meta.error && meta.touched,
          },
        )}
        // onClick={handleClick}
      >
        {icon}
        <input
          {...field}
          {...props}
          type={type !== 'password' ? type : showPassword ? 'text' : type}
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx(
            inputStyle,
            `w-full rounded-lg bg-transparent outline-none placeholder:font-normal`,
            {
              'placeholder:text-text_secondary': !isFocused && !(meta.error && meta.touched),
              'placeholder:text-secondary': isFocused && !(meta.error && meta.touched),
              'placeholder:text-red-600': meta.error && meta.touched,
            },
          )}
          autoComplete="off"
        />
        <FaEye
          onClick={() => setShowPassword(true)}
          className={clsx('block h-6 w-6 cursor-pointer', {
            hidden: showPassword || !(type === 'password'),
          })}
        />
        <FaEyeSlash
          onClick={() => setShowPassword(false)}
          className={clsx('block h-6 w-6 cursor-pointer', {
            hidden: !showPassword || !(type === 'password'),
          })}
        />
      </div>

      <div className={errorStyle}>
        {meta.error && meta.touched && <div className={`my-1 text-red-600`}>{meta.error}</div>}
      </div>
    </>
  );
};

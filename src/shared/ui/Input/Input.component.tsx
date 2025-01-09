'use client';

import { useField } from 'formik';
import { ChangeEvent, FocusEventHandler, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { InputProps } from './Input.props';

export const Input = ({
  inputStyle,
  containerStyle,
  icon,
  type,
  customOnChange,
  ...props
}: InputProps): JSX.Element => {
  const [field, meta, helpers] = useField(props);

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isError = useMemo(() => meta.error && meta.touched, [meta.error, meta.touched]);

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    field.onBlur(e);
    setIsFocused(false);
  };

  return (
    <>
      <div
        className={clsx(
          containerStyle,
          'flex w-full items-center rounded-2xl border-8 border-double bg-black bg-opacity-20 px-2 py-1 transition-colors duration-300',
          {
            'border-primary text-secondary': isFocused && !isError,
            'border-text_secondary text-text_secondary': !isFocused && !isError,
            'border-red-600 text-red-600': isError,
          },
        )}
      >
        {icon}
        <input
          type={type !== 'password' ? type : showPassword ? 'text' : type}
          onFocus={() => setIsFocused(true)}
          className={clsx(
            `w-full rounded-lg bg-transparent outline-none placeholder:font-normal`,
            {
              'placeholder:text-text_secondary': !isFocused && !isError,
              'placeholder:text-secondary': isFocused && !isError,
              'placeholder:text-red-600': isError,
            },
            inputStyle,
          )}
          autoComplete="off"
          {...props}
          {...field}
          onBlur={handleBlur}
          onChange={(e) => (customOnChange ? customOnChange(e) : field.onChange(e))}
        />
        {type === 'password' &&
          (showPassword ? (
            <FaEye
              onClick={() => setShowPassword(true)}
              className={clsx('block h-6 w-6 cursor-pointer')}
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShowPassword(false)}
              className={clsx('block h-6 w-6 cursor-pointer')}
            />
          ))}
      </div>
    </>
  );
};

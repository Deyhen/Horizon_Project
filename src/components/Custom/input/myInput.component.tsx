import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';
import { InputProps } from './myInput.props';

export const MyInput = ({
  label,
  inputStyle,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <>
      {label ? (
        <label className="mr-2 flex w-full flex-row text-lg font-bold">
          <span className="text-main w-32">{label}</span>
          <input {...field} {...props} className={inputStyle} autoComplete="off" />
        </label>
      ) : (
        <input {...field} {...props} className={inputStyle} autoComplete="off" />
      )}
      {meta.error && meta.touched && <div className="text-element">{meta.error}</div>}
    </>
  );
};

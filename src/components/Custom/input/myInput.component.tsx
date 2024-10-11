import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';
import { InputProps } from './myInput.props';

export const MyInput = ({
  label,
  inputStyle,
  containerStyle,
  labelStyle,
  errorStyle,
  icon,
  formik,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  
  const [field, meta] = useField(props);
  return (
    <>
      {label ? (
        <label className="mr-2 flex w-full flex-row text-lg font-bold">
          <span className="text-main w-32">{label}</span>
          <input {...field} {...props} className={labelStyle} autoComplete="off" />
        </label>
      ) : (
        <div className={ containerStyle + " " + `flex items-center px-2 py-1 bg-third rounded-lg border-white focus:border-first border-2 w-full`}>
          {icon}
          <input {...field} {...props} className={inputStyle
            + ' ' + 
            `bg-transparent text-white outline-none rounded-lg w-full placeholder:text-white placeholder:font-normal `}
            autoComplete="off" />
          
      </div>

      )}
      <div className={errorStyle}>
        {meta.error && meta.touched && <div className={`text-first my-1`}>{meta.error}</div>}
      </div>
    </>
  );
};

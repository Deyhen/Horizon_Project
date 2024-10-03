import {  useField } from "formik";
import {  InputHTMLAttributes } from "react";
import { InputProps } from "./myInput.props";

export const MyInput = ({label, inputStyle, ...props}: InputProps & InputHTMLAttributes<HTMLInputElement>): JSX.Element => {

    const [field, meta] = useField(props);
    return (
      <>
        {label ?
        <label className="flex flex-row mr-2 font-bold text-lg w-full">
            
            <span className="w-32 text-main">{label}</span>
            <input {...field} {...props} 
            className={inputStyle}
            autoComplete="off"/>
        </label>
        :
        <input {...field} {...props} 
            className={inputStyle}
            autoComplete="off"/>
}
        {meta.error && meta.touched && <div className="text-element ">{meta.error}</div>}
      </>
    );
  }
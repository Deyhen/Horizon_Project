import { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react';
import { IconType } from 'react-icons';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputStyle?: string;
  name: string;
  containerStyle?: string;
  icon?: ReactElement<IconType>;
  customOnChange?: (e: ChangeEvent<HTMLInputElement>) => string | number | undefined | void;
}

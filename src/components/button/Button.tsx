import { FC, ButtonHTMLAttributes } from 'react';
import Spinner from '../spinner/Spinner';

// styles
import './button.styles.scss';

// types
export enum BUTTON_TYPES_CLASSES {
  google = 'google-sign-in',
  inverted = 'inverted',
}

export type ButtonProps = {
buttonType?: BUTTON_TYPES_CLASSES | any;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const styleButton = (type: string | null): string => {
  if (type === 'google') {
    return BUTTON_TYPES_CLASSES.google;
  }
  if (type === 'inverted') {
    return BUTTON_TYPES_CLASSES.inverted;
  }
  return '';
};

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  ...props
}) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <button className={`${styleButton} button-container`} {...props}>
      {children}
    </button>
  );
};

export default Button;

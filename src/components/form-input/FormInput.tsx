import { FC, InputHTMLAttributes } from 'react';

// styles
import './form-input.styles.scss';

type formInput = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<formInput> = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value &&
            typeof otherProps.value === 'string' &&
            Boolean(otherProps?.value?.length)
              ? 'shrink'
              : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;

import { useEffect, useState, FC, FormEvent, ChangeEvent } from 'react';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

// redux
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';

// components
import FormInput from '../form-input/FormInput';
import Button from '../button/Button';

// styles
import './sign-in.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';

// default forms
const defaultFormFields = {
  email: '',
  password: '',
};

const SignIn: FC = () => {
  // states
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // redux
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  // router
  const navigate = useNavigate();

  // button
  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  // handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormFields((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));

      setFormFields(defaultFormFields);
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(error);
          break;
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Email'}
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />

        <FormInput
          label={'Password'}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={'google'}
            type="button"
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

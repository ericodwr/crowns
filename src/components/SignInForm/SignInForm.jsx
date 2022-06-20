import React, { useState } from 'react';

import './SignInForm.styles.scss';

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

// Components
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // State
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // Reset form after submit
  const resetFormFields = () => setFormFields(defaultFormFields);

  // google sign in function
  const googleSignIn = async () => {
    // Get user data
    await signInWithGooglePopup();
  };

  // Handling changes form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  // Handling submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sign in using email and password
    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password!');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log('User countered error!', error);
          break;
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Email'}
          name="email"
          type="email"
          id="email"
          onChange={handleChange}
          value={email}
          required
        />

        <FormInput
          label={'Password'}
          name="password"
          type="password"
          id="password"
          onChange={handleChange}
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={googleSignIn} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

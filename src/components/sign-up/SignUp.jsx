import React, { useState } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/FormInput';

import Button from '../button/Button';

import './sign-up-styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    setFormFields((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return alert('password do not match');

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
      );
      await createUserDocumentFromAuth(user, { displayName });
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Dont have an account?</h2>
      <span>SignUp with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Display Name'}
          type="text"
          value={displayName}
          name="displayName"
          onChange={handleChange}
          required
        />

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

        <FormInput
          label={'Confirm Password'}
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;

import React, { useState } from 'react';

// Styles
import './SignUp.styles.scss';

// firebase utils
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

// Components
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';

// Default Forms
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  // State
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // Context

  // Reset form function
  const resetFormFields = () => setFormFields(defaultFormFields);

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

    if (password !== confirmPassword) {
      return alert('Password do not match!');
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password,
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('User countered error!', error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Display Name'}
          name="displayName"
          id="name"
          type="text"
          onChange={handleChange}
          value={displayName}
          required
        />

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

        <FormInput
          label={'Confirm Password'}
          name="confirmPassword"
          type="password"
          id="cpassword"
          onChange={handleChange}
          value={confirmPassword}
          required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;

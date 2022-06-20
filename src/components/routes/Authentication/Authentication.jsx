import React from 'react';

import './Authentication.styles.scss';

import SignUpForm from '../../SignUpForm/SignUpForm';
import SignInForm from '../../SignInForm/SignInForm';

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;

import React from 'react';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import SignUp from '../../components/sign-up/SignUp';
import Button from '../../components/button/Button';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };

  return (
    <div>
      <h2>SignIn</h2>
      <Button buttonType={'google'} onClick={logGoogleUser}>
        Sign In with Google
      </Button>

      <SignUp />
    </div>
  );
};

export default SignIn;

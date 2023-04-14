// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// authentication
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

// firestore db
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCL51U64TnuDaJZ_zooZsw3VdDfZsJuhUg',
  authDomain: 'crowns-db-80b37.firebaseapp.com',
  projectId: 'crowns-db-80b37',
  storageBucket: 'crowns-db-80b37.appspot.com',
  messagingSenderId: '376455158775',
  appId: '1:376455158775:web:df24343d5c62e943bfacf2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth();

// db
export const db = getFirestore();

// create user
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user not exists create one
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }

    // if user data exists return userDocRef
    return userDocRef;
  }
};

// google sign in
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// sign up email/password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

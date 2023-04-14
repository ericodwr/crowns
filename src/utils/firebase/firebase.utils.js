// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// authentication
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
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

// google sign in

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// db
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }

    // if user data exists return userDocRef
    return userDocRef;
  }
};

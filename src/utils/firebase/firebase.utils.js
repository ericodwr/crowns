import { initializeApp } from 'firebase/app';

// Auth
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// Database FireStore
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAm5VWwjBwyBc6LO5aLct0PLUu9RfjBe7g',
  authDomain: 'crowns-db-5ac4b.firebaseapp.com',
  projectId: 'crowns-db-5ac4b',
  storageBucket: 'crowns-db-5ac4b.appspot.com',
  messagingSenderId: '335520111713',
  appId: '1:335520111713:web:843469077442c1b50d1e20',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google Auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

// Authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Database FireStore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // set the initial documents (database)
  const userDocRef = doc(db, 'users', userAuth.uid);

  // Get the documents
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot.exists());
  console.log(userSnapShot);

  // create a new documents if its not exist
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  // If exist return the documents
  return userDocRef;
};

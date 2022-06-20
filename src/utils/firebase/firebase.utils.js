import { initializeApp } from 'firebase/app';

// Auth
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

// Create database user
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {},
) => {
  // return nothing if user not found
  if (!userAuth) return;

  // set the initial documents (database)
  const userDocRef = doc(db, 'users', userAuth.uid);

  // Get the documents
  const userSnapShot = await getDoc(userDocRef);

  // create a new documents if its not exist
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        ...additionalInfo,
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

// Sign Up with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // return if data not complete
  if (!email || !password) return;

  // creating authentication using email and password
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign In with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  // return if data not complete
  if (!email || !password) return;

  // creating authentication using email and password
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign Out
export const signOutUser = async () => signOut(auth);

// Follow up if auth changes
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

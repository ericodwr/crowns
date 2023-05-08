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
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from 'firebase/auth';

// firestore db
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

// Typescript
import { Category } from '../../store/categories/categories.types';

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

// TS
export type ObjectToAdd = {
  title: string;
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

// add data to firebase
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[],
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

// get data from firebase
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  // get collection ref
  const collectionRef = collection(db, 'categories');
  // some query
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  // re mapping data
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category,
  );
};

// create user
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation,
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log('error creating user', error);
    }

    // if user data exists return userSnapshot
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// tracking user
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

// sign up email/password
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in email/password
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// google sign in
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Sign Out
export const signOutUser = async () => await signOut(auth);

// get current user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    );
  });
};

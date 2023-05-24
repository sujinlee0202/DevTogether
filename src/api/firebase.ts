// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { User } from '../types/user';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const setSignUp = async (user: User) => {
  console.log('firebase', user);
  await addDoc(collection(db, 'user'), {
    uid: user.uid,
    name: user.name,
    email: user.email,
    password: user.password,
    profileImage: user.profileImage,
    signupDate: user.signupDate,
    loginDate: user.loginDate,
    logoutDate: user.logoutDate,
    marketing_agree: user.marketing_agree,
    age_agree: user.age_agree,
    privacy_agree: user.privacy_agree,
    terms_of_use_agree: user.terms_of_use_agree,
  });
};

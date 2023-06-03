// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { User } from '../types/user';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { Inputs } from '../types/signup';
import { Post } from '../types/post';
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
const auth = getAuth();

export const setUser = async (user: User | Inputs) => {
  const userRef = collection(db, 'user');
  await setDoc(doc(userRef, user.email), user);
};

export const getUser = async (email: string) => {
  const docRef = doc(db, 'user', email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return undefined;
  }
};

export const setSignUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      return userCredential.user;
    },
  );
};

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      return userCredential.user;
    },
  );
};

export const onAuthStateChange = (callback: (user: any) => void) => {
  onAuthStateChanged(auth, async (user) => {
    callback(user);
  });
};

export const logout = async () => {
  return signOut(auth).then(() => {});
};

export const setPost = async (post: Post) => {
  const userRef = collection(db, 'post');
  await setDoc(doc(userRef, post.postid), post);
};

export const getPost = async () => {
  const postSnap = await getDocs(collection(db, 'post'));
  const postData: Post[] = [];
  postSnap.forEach((doc) => {
    postData.push(doc.data() as Post);
  });
  return postData;
};

export const getComment = async (id: string) => {
  const commentSnap = await getDocs(collection(db, `/post/${id}/comment`));
  const commentData: Comment[] = [];
  commentSnap.forEach((doc) => {
    commentData.push(doc.data() as Comment);
  });
  return commentData;
};

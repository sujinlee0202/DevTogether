import { Like } from './../types/post';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  Timestamp,
  orderBy,
  limit,
  query,
  startAfter,
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
import { v4 as uuidv4 } from 'uuid';
import { Chat } from '../types/chat';

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
  const postQuery = query(collection(db, 'post'), limit(10));
  const postSnap = await getDocs(postQuery);

  const postData: Post[] = [];
  postSnap.forEach((doc) => {
    postData.push(doc.data() as Post);
  });

  return postData;
};

export const first = async () => {
  const first = query(
    collection(db, 'post'),
    orderBy('date', 'desc'),
    limit(5),
  );

  const postSnap = await getDocs(first);
  return postSnap;
};

export const next = async (pageParam: any) => {
  const next = query(
    collection(db, 'post'),
    orderBy('date', 'desc'),
    startAfter(pageParam),
    limit(5),
  );

  const nextSnap = await getDocs(next);
  return nextSnap;
};

export const getFBComment = async (postId: string) => {
  const commentSnap = await getDocs(collection(db, `/post/${postId}/comment`));
  const commentData: Comment[] = [];
  commentSnap.forEach((doc) => {
    commentData.push(doc.data() as Comment);
  });
  return commentData;
};

export const setFBComment = async (data: {
  postId: string;
  email: string;
  profileImage: string;
  comment: string;
  name: string;
  date: Timestamp;
}) => {
  const commentRef = collection(db, `post/${data.postId}/comment`);
  await setDoc(doc(commentRef, uuidv4()), {
    email: data.email,
    profileImage: data.profileImage,
    comment: data.comment,
    name: data.name,
    date: data.date,
  });
};

export const setFBLike = async (
  postId: string,
  email: string,
  name: string,
  profileImage: string,
) => {
  const likeRef = collection(db, `post/${postId}/like`);
  await setDoc(doc(likeRef, email), {
    email,
    name,
    profileImage,
  });
};

export const getFBLike = async (postId: string) => {
  const likeSnap = await getDocs(collection(db, `/post/${postId}/like`));
  const likeData: Like[] = [];
  likeSnap.forEach((doc) => {
    likeData.push(doc.data() as Like);
  });
  return likeData;
};

export const deleteFBLike = async (postId: string, email: string) => {
  await deleteDoc(doc(db, `post/${postId}/like`, email));
};

export const setFBChatList = async (
  sendEmail: string,
  receiveEmail: string,
) => {
  const channelSendRef = collection(db, `chat/${sendEmail}/channel`);

  await setDoc(doc(channelSendRef, receiveEmail), {
    receiveEmail,
  });
};

export const setFBChat = async (
  chat: string,
  receiveEmail: string,
  receiveName: string,
  receiveImage: string,
  sendName: string,
  sendEmail: string,
  sendImage: string,
  date: Timestamp,
) => {
  const chatSendRef = collection(
    db,
    `chat/${sendEmail}/channel/${receiveEmail}/message`,
  );

  const chatReceiveRef = collection(
    db,
    `chat/${receiveEmail}/channel/${sendEmail}/message`,
  );

  const channelSendRef = collection(db, `chat/${sendEmail}/channel`);

  await setDoc(doc(channelSendRef, receiveEmail), {
    receiveEmail,
    receiveName,
    receiveImage,
  });

  await setDoc(doc(chatSendRef), {
    chat,
    receiveName,
    receiveEmail,
    receiveImage,
    sendName,
    sendEmail,
    sendImage,
    date,
  });

  await setDoc(doc(chatReceiveRef), {
    chat,
    receiveName,
    receiveEmail,
    receiveImage,
    sendName,
    sendEmail,
    sendImage,
    date,
  });
};

export const getFBChat = async (sendEmail: string, receiveEmail: string) => {
  const chatSnap = await getDocs(
    collection(db, `/chat/${sendEmail}/channel/${receiveEmail}/message`),
  );
  const chatData: Chat[] = [];
  chatSnap.forEach((doc) => {
    chatData.push(doc.data() as Chat);
  });
  return chatData;
};

export const getFBChatList = async (sendEmail: string) => {
  const chatListSnap = await getDocs(
    collection(db, `/chat/${sendEmail}/channel`),
  );
  const chatListData: string[] = [];

  chatListSnap.forEach((doc: any) => {
    chatListData.push(doc.data());
  });

  return chatListData;
};

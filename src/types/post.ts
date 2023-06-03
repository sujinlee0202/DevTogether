import { Timestamp } from 'firebase/firestore';

export type Post = {
  title: string;
  article: string;
  email: string;
  postid: string;
  like: number;
  comment: string[];
  date: Timestamp;
};

export type Comment = {
  comment: string;
  count: number;
  email: string;
  name: string;
};

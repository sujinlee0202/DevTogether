import { Timestamp } from 'firebase/firestore';

export type Post = {
  title: string;
  article: string;
  email: string;
  postid: string;
  like: Like[];
  comment: string[];
  date: Timestamp;
  name: string;
};

export type Comment = {
  comment: string;
  email: string;
  profileImage: string;
  name: string;
  date: Timestamp;
  postId?: string | undefined;
};

export type Like = {
  email: string;
  name: string;
  profileImage: string;
};

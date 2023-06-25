import { Timestamp } from 'firebase/firestore';

export type Chat = {
  chat: string;
  date: Timestamp;
  receiveEmail: string;
  receiveName: string;
  receiveImage: string;
  sendEmail: string;
  sendName: string;
  sendImage: string;
};

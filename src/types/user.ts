import { Timestamp } from 'firebase/firestore';

export type User = {
  uid: string;
  name: string;
  email: string;
  password: string;
  profileImage: string;
  signupDate: Timestamp;
  loginDate: Timestamp;
  logoutDate: Timestamp;
  marketing_agree: boolean;
  age_agree: boolean;
  privacy_agree: boolean;
  terms_of_use_agree: boolean;
};

import { createContext, useState, useEffect } from 'react';
import { User } from '../types/user';
import { getUser, onAuthStateChange } from '../api/firebase';

export interface LoginContextType {
  user: User | null;
  setUser: React.Dispatch<any> | null;
  profileImage: string;
}

export const loginContext = createContext<LoginContextType>({
  user: null,
  setUser: null,
  profileImage: '',
});

interface Props {
  children: React.ReactNode;
}

const LoginProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const sessionUser = sessionStorage.getItem('user');
  const object = sessionUser && JSON.parse(sessionUser);
  const profileImage = object && object.dbUser.profileImage;

  useEffect(() => {
    onAuthStateChange((user) => {
      user &&
        getUser(user.email).then((dbUser) => {
          setUser({ ...user, dbUser });
          sessionStorage.setItem('user', JSON.stringify({ ...user, dbUser }));
        });
    });
  }, [user?.email]);

  return (
    <loginContext.Provider value={{ user, setUser, profileImage }}>
      {children}
    </loginContext.Provider>
  );
};

export default LoginProvider;

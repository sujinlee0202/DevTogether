import { useContext } from 'react';
import { logout } from '../../api/firebase';
import { loginContext } from '../../context/loginContext';

const Modal = () => {
  const { setUser } = useContext(loginContext);

  const handleLogout = () => {
    logout().then(() => {
      setUser && setUser(null);
      sessionStorage.removeItem('user');
    });
  };

  return (
    <div className="flex flex-col bg-white border w-40 absolute top-10 right-1">
      <button className="border-b py-2 text-sm hover:bg-blue-50">
        내 프로필
      </button>
      <button onClick={handleLogout} className="py-2 text-sm hover:bg-blue-50">
        로그아웃
      </button>
    </div>
  );
};

export default Modal;

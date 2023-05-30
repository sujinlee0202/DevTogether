import { useContext, useState } from 'react';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { MdOutlineSpeakerNotes } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { loginContext } from '../../context/loginContext';

const Nav = () => {
  const { profileImage } = useContext(loginContext);

  const [selectMenu, setSelectMenu] = useState('home');
  const handleClickMenu = (menu: string) => {
    setSelectMenu(menu);
  };

  return (
    <nav className="absolute bottom-0 w-full h-14 flex items-center justify-between px-4 border-t shadow-[0px_-1px_24px_0px_rgba(0,0,0,0.1)] md:hidden bg-white">
      <div
        className={`w-14 flex flex-col items-center ${
          selectMenu === 'home' && 'text-orange-500'
        }`}
        onClick={() => handleClickMenu('home')}
      >
        <AiOutlineHome className="text-2xl" />
        <p className="text-xs">홈</p>
      </div>
      <div
        className={`w-14 flex flex-col items-center ${
          selectMenu === 'qna' && 'text-orange-500'
        }`}
        onClick={() => handleClickMenu('qna')}
      >
        <MdOutlineSpeakerNotes className="text-2xl" />
        <p className="text-xs">Q&A</p>
      </div>
      {profileImage && (
        <img src={profileImage} className="w-8 h-8 rounded-full" />
      )}
      {!profileImage && (
        <Link
          to="/login"
          className={`w-14 flex flex-col items-center ${
            selectMenu === 'login' && 'text-orange-500'
          }`}
          onClick={() => handleClickMenu('login')}
        >
          <AiOutlineUser className="text-2xl" />
          <p className="text-xs">로그인</p>
        </Link>
      )}
    </nav>
  );
};

export default Nav;

// box-shadow: 0px -6px 20px 0px rgba(0, 0, 0, 0.1)

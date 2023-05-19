import { useState } from 'react';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { MdOutlineSpeakerNotes } from 'react-icons/md';

const Nav = () => {
  const [selectMenu, setSelectMenu] = useState('home');
  const handleClickMenu = (menu: string) => {
    setSelectMenu(menu);
  };

  return (
    <nav className="absolute bottom-0 w-full h-14 flex items-center justify-between px-4 border-t shadow-[0px_-1px_24px_0px_rgba(0,0,0,0.1)] md:hidden">
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
      <div
        className={`w-14 flex flex-col items-center ${
          selectMenu === 'login' && 'text-orange-500'
        }`}
        onClick={() => handleClickMenu('login')}
      >
        <AiOutlineUser className="text-2xl" />
        <p className="text-xs">로그인</p>
      </div>
    </nav>
  );
};

export default Nav;

// box-shadow: 0px -6px 20px 0px rgba(0, 0, 0, 0.1)

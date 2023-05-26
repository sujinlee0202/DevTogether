import { useState, useContext } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { loginContext } from '../../context/loginContext';
import { logout } from '../../api/firebase';

const Header = () => {
  const { setUser } = useContext(loginContext);
  const [search, setSearch] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleInput = (e: any) => {
    setSearch(e.target.value);
  };

  // 임시 로그아웃 코드
  const handleLogout = () => {
    logout().then(() => {
      setUser && setUser(null);
      sessionStorage.removeItem('user');
    });
  };

  const sessionUser = sessionStorage.getItem('user');
  const object = sessionUser && JSON.parse(sessionUser);

  const profileImage = object && object.dbUser.profileImage;

  return (
    <header className="w-full h-14 border-b px-4 shadow-[0px_1px_24px_0px_rgba(0,0,0,0.1)] bg-white">
      <div className="w-full h-full max-w-screen-xl flex items-center mx-auto justify-between gap-4">
        <Link to="/" className="flex items-end shrink-0">
          <div className="font-bold text-xl mr-4 shrink-0">
            개발<span className="text-orange-500">가치</span>
          </div>
          <div className="text-sm text-gray-700 shrink-0 hidden md:block">
            개발자 Q&A
          </div>
        </Link>
        <form
          className="w-full max-w-screen-sm flex items-center border rounded-2xl pl-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-full rounded-l-2xl p-1"
            value={search}
            onChange={handleInput}
          ></input>
          <button className="w-6 h-6 rounded-r-xl mr-3">
            <BiSearch className="text-xl" />
          </button>
        </form>
        <button className="md:hidden w-6 h-6 flex items-center justify-center shrink-0">
          <HiOutlineChatBubbleOvalLeftEllipsis className="text-2xl" />
        </button>
        {sessionUser ? (
          <div
            onClick={handleLogout}
            className="hidden md:flex shrink-0 gap-2 items-center"
          >
            <HiOutlineChatBubbleOvalLeftEllipsis className="text-2xl" />
            <img src={profileImage} className="w-8 h-8 rounded-full"></img>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link to="/login" className="border py-1 px-2 rounded-xl text-sm">
              로그인
            </Link>
            <Link
              to="/signup"
              className="border py-1 px-2 rounded-xl text-sm bg-orange-400 text-white font-bold"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useState, useContext } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import { loginContext } from '../../context/loginContext';
import Modal from '../Modal';

const Header = () => {
  const { user, profileImage } = useContext(loginContext);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleInput = (e: any) => {
    setSearch(e.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleMoveChatPage = () => {
    navigate('/chat', {
      state: user?.dbUser,
    });
  };

  return (
    <header className="w-full h-14 border-b px-4 shadow-[0px_1px_24px_0px_rgba(0,0,0,0.1)] bg-white">
      <div className="w-full h-full max-w-screen-xl flex items-center mx-auto justify-between gap-4">
        <Link to="/" className="flex items-end shrink-0">
          <div className="font-bold text-xl mr-4 shrink-0">
            개발<span className="text-orange-500">가치</span>
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
        {profileImage ? (
          <div className="relative flex shrink-0 gap-2 items-center">
            <HiOutlineChatBubbleOvalLeftEllipsis
              className="text-2xl"
              onClick={handleMoveChatPage}
            />
            <img
              src={profileImage}
              className="w-8 h-8 rounded-full"
              onClick={handleOpenModal}
            ></img>

            {/** 모달 */}
            {openModal && <Modal />}
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

import { useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { getFBChatList } from '../../api/firebase';
import { useQuery } from '@tanstack/react-query';
import ChatProfile from '../../components/ChatProfile';

const ChatPage = () => {
  const { user } = useContext(loginContext);
  const navigate = useNavigate();

  const { data: chatListData } = useQuery({
    queryKey: ['chatList', user?.email],
    queryFn: () => user && getFBChatList(user.email),
  });

  const handleMoveChat = (user: any) => {
    navigate(`/chat/message`, {
      state: user,
    });
  };

  return (
    <section className="w-5/6 h-[88vh] max-h-screen flex mx-auto my-10 bg-white border overflow-auto">
      {/* <p className="text-sm">대화 목록이 존재하지 않습니다</p> */}
      {/** 채팅 목록 */}
      <div className="flex flex-col w-52 h-full border-r shrink-0">
        <div className="w-full h-14 border-b text-xl font-bold flex items-center pl-3">
          채팅
        </div>
        {chatListData?.map((user, index) => (
          <ChatProfile
            key={index}
            receiveUser={user}
            onClick={() => handleMoveChat(user)}
          />
        ))}
      </div>
      {/** 채팅 내용 구역 */}
      <Outlet />
    </section>
  );
};

export default ChatPage;

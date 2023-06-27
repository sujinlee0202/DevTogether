import { useMutation, useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { getFBChat, getFBChatList, setFBChat } from '../../api/firebase';
import { loginContext } from '../../context/loginContext';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Timestamp } from 'firebase/firestore';
import { Chat } from '../../types/chat';

const Message = () => {
  const { user } = useContext(loginContext);
  const location = useLocation();
  const { receiveEmail, receiveName, receiveImage } = location.state;

  const { data: chatData, refetch: refetchChatData } = useQuery({
    queryKey: ['chat', user?.email],
    queryFn: () => user && getFBChat(user.email, receiveEmail),
    staleTime: 1000,
  });

  const { refetch: refetchChatList } = useQuery({
    queryKey: ['chatList', user?.email],
    queryFn: () => user && getFBChatList(user.email),
  });

  useEffect(() => {
    refetchChatData();
  }, [receiveName]);

  const mutation = useMutation({
    mutationFn: ({
      chat,
      receiveEmail,
      receiveImage,
      receiveName,
      sendEmail,
      sendImage,
      sendName,
      date,
    }: Chat) =>
      setFBChat(
        chat,
        receiveEmail,
        receiveName,
        receiveImage,
        sendName,
        sendEmail,
        sendImage,
        date,
      ),
  });

  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      refetchChatData();
      refetchChatList();
    }
  }, [mutation.isSuccess]);

  const onSubmit = (data: any) => {
    if (user) {
      mutation.mutate({
        chat: data.chat,
        receiveEmail: receiveEmail,
        receiveName: receiveName,
        receiveImage: receiveImage,
        sendName: user.dbUser.name,
        sendEmail: user.email,
        sendImage: user.dbUser.profileImage,
        date: Timestamp.fromDate(new Date()),
      });
    }
    reset();
  };

  return (
    <div className="w-full">
      {/** 받는 사람 */}
      <p className="h-14 border-b flex items-center pl-3">{receiveName}</p>

      {/** 채팅 내용 */}
      <div className="h-[calc(100%-112px)] border-b px-2 py-4 flex flex-col gap-1 overflow-auto">
        {/* 프로필 이미지
          <div className="flex items-center gap-2">
            <img src={profileImage} className="rounded-full"></img>
            <p>{name}</p>
          </div>
        */}

        {chatData
          ?.sort((a, b) => a.date.seconds - b.date.seconds)
          .map((chat, index) => {
            /** 다른사람 채팅 */
            if (chat.sendEmail !== user?.email) {
              return (
                <div key={index} className="flex flex-col items-start">
                  <pre className="w-fit py-1 px-2 text-sm bg-gray-200 rounded-md whitespace-pre-wrap font-sans mb-2">
                    <span>{chat.chat}</span>
                  </pre>
                </div>
              );
            }
            /** 내 채팅 */
            if (chat.sendEmail === user.email) {
              return (
                <div key={index} className="flex flex-col items-end gap-2">
                  <pre className="w-fit py-1 px-3 text-sm bg-orange-300 rounded-md whitespace-pre-wrap font-sans">
                    <span>{chat.chat}</span>
                  </pre>
                </div>
              );
            }
          })}
      </div>
      {/** 채팅 입력 폼 */}
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-14 flex items-center px-4 bg-white text-sm">
          <textarea
            className="resize-none w-full h-14 flex-grow flex items-center py-4 outline-none"
            placeholder="메시지를 남겨보세요."
            {...register('chat', {
              required: true,
            })}
          />
          <div className="w-20 h-full flex items-center justify-center">
            <button
              className={`px-2 py-1 text-white rounded-md ${
                isValid ? 'bg-red-500' : 'bg-red-300'
              }`}
            >
              보내기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Message;

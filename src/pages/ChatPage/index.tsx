import { useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { useLocation } from 'react-router-dom';
import ChatProfile from '../../components/ChatProfile';
import { useForm } from 'react-hook-form';

const ChatPage = () => {
  const { user } = useContext(loginContext);
  const location = useLocation();
  const { name, profileImage } = location.state;

  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <section className="w-5/6 h-[88vh] max-h-screen flex mx-auto my-10 bg-white border overflow-auto">
      {/* <p className="text-sm">대화 목록이 존재하지 않습니다</p> */}
      {/** 채팅 목록 */}
      <div className="flex flex-col w-52 h-full border-r shrink-0">
        <div className="w-full h-14 border-b text-xl font-bold flex items-center pl-3">
          채팅
        </div>
        <ChatProfile receiveUser={location.state} />
      </div>

      {/** 채팅 내용 구역 */}
      <div className="w-full">
        {/** 받는 사람 */}
        <p className="h-14 border-b flex items-center pl-3">{name}</p>

        {/** 채팅 내용 */}
        <div className="h-[calc(100%-112px)] border-b px-2 py-4 flex flex-col gap-2">
          {/** 다른사람 채팅 */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <img src={profileImage} className="rounded-full"></img>
              <p>{name}</p>
            </div>
            <pre className="w-fit ml-9 py-1 px-2 text-sm bg-gray-200 rounded-md whitespace-pre-wrap font-sans mb-2">
              <span>
                hello my name is sujin <br />
                안녕하세요 내 이름은 이수진이에요
              </span>
            </pre>
            <pre className="w-fit ml-9 py-1 px-2 text-sm bg-gray-200 rounded-md whitespace-pre-wrap font-sans mb-2">
              <span>hello my name is sujin</span>
            </pre>
          </div>

          {/** 내 채팅 */}
          <div className="flex flex-col items-end gap-2">
            <pre className="w-fit py-1 px-3 text-sm bg-orange-300 rounded-md whitespace-pre-wrap font-sans">
              <span>hello my name is sujin, too</span>
            </pre>
            <pre className="w-fit py-1 px-2 text-sm bg-orange-300 rounded-md whitespace-pre-wrap font-sans">
              <span>hello</span>
            </pre>
          </div>
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
    </section>
  );
};

export default ChatPage;

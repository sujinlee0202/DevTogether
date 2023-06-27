interface Props {
  receiveUser: any;
  onClick: () => void;
}

const ChatProfile = ({ receiveUser, onClick }: Props) => {
  const { receiveImage, receiveName }: any = receiveUser;

  return (
    <div
      className="w-full h-14 border-b flex items-center gap-3 pl-3"
      onClick={onClick}
    >
      <img src={receiveImage} className="rounded-full"></img>
      <p>{receiveName}</p>
    </div>
  );
};

export default ChatProfile;

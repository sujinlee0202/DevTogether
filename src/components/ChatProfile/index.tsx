import { User } from '../../types/user';

interface Props {
  receiveUser: User;
}

const ChatProfile = ({ receiveUser }: Props) => {
  console.log(receiveUser);
  return (
    <div className="w-full h-14 border-b flex items-center gap-3 pl-3">
      <img src={receiveUser.profileImage} className="rounded-full"></img>
      <p>{receiveUser.name}</p>
    </div>
  );
};

export default ChatProfile;

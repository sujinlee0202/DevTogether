import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';

interface Props {
  postUser: User | undefined;
  date: string;
}

const PostProfile = ({ postUser, date }: Props) => {
  const navigate = useNavigate();

  const handleMoveChat = () => {
    navigate('/chat', {
      state: postUser,
    });
  };

  return (
    <div className="flex items-center gap-3" onClick={handleMoveChat}>
      <img
        src={postUser && postUser.profileImage}
        alt="user"
        className="rounded-full w-8 h-8"
      />
      <div className="text-sm">
        <p className="font-bold">{postUser && postUser.name}</p>
        <p className="text-gray-500">{date}</p>
      </div>
    </div>
  );
};

export default PostProfile;

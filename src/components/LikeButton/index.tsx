import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface Props {
  like: boolean;
  onClick: () => void;
}

const LikeButton = ({ like, onClick }: Props) => {
  return (
    <div
      className={`w-fit flex items-center gap-1 text-sm cursor-pointer ${
        like && 'text-blue-600'
      }`}
      onClick={onClick}
    >
      {like ? (
        <AiFillHeart className="w-4 h-4" />
      ) : (
        <AiOutlineHeart className="w-4 h-4" />
      )}
      <p>좋아요</p>
    </div>
  );
};

export default LikeButton;

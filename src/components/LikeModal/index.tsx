import { useEffect } from 'react';
import { Like } from '../../types/post';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  likeUser: Like[] | undefined;
  onClose: () => void;
}

const LikeModal = ({ likeUser, onClose }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black opacity-50`}
      ></div>
      <div className="absolute top-1/2 left-1/2 w-1/3 h-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 bg-white border p-4 z-20 rounded-xl">
        <p className="text-center font-bold border-b pb-4">좋아요한 사람</p>
        <button
          className="absolute top-4 right-6 font-bold text-gray-500"
          onClick={() => onClose()}
        >
          <AiOutlineClose />
        </button>
        {likeUser?.map((user) => (
          <div key={user.email} className="flex items-center gap-3">
            {user.profileImage && (
              <img
                src={user.profileImage}
                className="w-10 h-10 rounded-full"
              ></img>
            )}
            {!user.profileImage && (
              <div className="bg-gray-200 w-10 h-10 rounded-full"></div>
            )}
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default LikeModal;

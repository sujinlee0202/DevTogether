import { useEffect, useRef } from 'react';
import { Like } from '../../types/post';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  likeUser: Like[] | undefined;
  onClose: () => void;
}

const LikeModal = ({ likeUser, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // 모달을 스크롤된 위치의 중간으로 위치시키는 함수
    const calculateModalPosition = () => {
      const scrollY = window.scrollY;

      const modalHeight = modalRef.current?.offsetHeight || 0;
      const bgHeight = backgroundRef.current?.offsetHeight || 0;
      const windowHeight = window.innerHeight;

      const top = scrollY + (windowHeight - modalHeight) / 2;
      const left = '50%';
      const transform = 'translateX(-50%)';
      const bgTop = scrollY + (windowHeight - bgHeight);

      if (modalRef.current) {
        modalRef.current.style.top = `${top}px`;
        modalRef.current.style.left = left;
        modalRef.current.style.transform = transform;
      }

      if (backgroundRef.current) {
        backgroundRef.current.style.top = `${bgTop}px`;
        backgroundRef.current.style.left = '0px';
      }
    };

    // 모달이 열릴 때 스크롤 위치 계산
    calculateModalPosition();

    // 윈도우의 사이즈 변경 시 모달 위치 재계산
    const handleResize = () => {
      calculateModalPosition();
    };

    window.addEventListener('resize', handleResize);

    // 모달이 닫힐 때 스크롤 위치 초기값 복원
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black opacity-50`}
        ref={backgroundRef}
      ></div>
      <div
        ref={modalRef}
        className="absolute top-1/2 left-1/2 w-1/3 h-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 bg-white border p-4 z-20 rounded-xl"
      >
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

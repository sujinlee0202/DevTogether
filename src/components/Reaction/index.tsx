import { useEffect, useState } from 'react';
import LikeButton from '../LikeButton';
import { User } from '../../types/user';
import { Like, Post } from '../../types/post';
import LikeModal from '../LikeModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteFBLike,
  getFBComment,
  getFBLike,
  setFBLike,
} from '../../api/firebase';
import { useNavigate } from 'react-router-dom';
import { formattedDate } from '../../utils/formattedDate';

interface Props {
  user: User | null;
  post: Post;
  mode: string;
}

const Reaction = ({ user, post, mode }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [likeData, setLikeData] = useState<Like[]>();
  const [isLike, setIsLike] = useState(false);

  const { data: likeQueryData } = useQuery({
    queryKey: ['like', post.postid],
    queryFn: () => getFBLike(post.postid),
    staleTime: 1000 * 60,
  });

  const { data: commentData } = useQuery({
    queryKey: ['comment', post.postid],
    queryFn: async () => getFBComment(post.postid),
    staleTime: 1000 * 60 * 5,
  });

  // login user가 like data안에 있을 때
  useEffect(() => {
    if (!user) return;
    if (likeData?.map((data) => data.email).includes(user?.email)) {
      setIsLike(true);
    }
  }, [likeData]);

  // react query를 사용해 가져온 like data를 state로 저장
  useEffect(() => {
    if (likeQueryData) setLikeData(likeQueryData);
  }, [likeQueryData]);

  const client = useQueryClient();
  const navigate = useNavigate();

  const handleLike = () => {
    setIsLike((prev) => !prev);
    // query 데이터를 최신 상태로 업데이트
    client.invalidateQueries();
    if (isLike) {
      if (user) {
        deleteFBLike(post.postid, user.email);
      }
    } else {
      if (user) {
        setFBLike(
          post.postid,
          user.email,
          user.dbUser.name,
          user.dbUser.profileImage,
        );
      }
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMoveDetail = () => {
    navigate(`/article/${post.postid}`, {
      state: {
        ...post,
        date: formattedDate(post.date),
      },
    });
  };

  return (
    <>
      <LikeButton like={isLike} onClick={handleLike} />
      {openModal && (
        <LikeModal likeUser={likeData} onClose={handleCloseModal} />
      )}
      <div className="flex items-center text-sm gap-1">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleOpenModal}
        >
          <p>좋아요</p>
          <p className="mr-2">{likeQueryData?.length}</p>
        </div>
        {mode === 'timeline' && (
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleMoveDetail}
          >
            <p>댓글</p>
            <p>{commentData?.length}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Reaction;

import { useEffect, useState, useRef, useContext } from 'react';
import { Post, Comment, Like } from '../../types/post';
import {
  deleteFBLike,
  getComment,
  getFBLike,
  getUser,
  setFBLike,
} from '../../api/firebase';
import { User } from '../../types/user';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { formattedDate } from '../../utils/formattedDate';
import { loginContext } from '../../context/loginContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LikeModal from '../LikeModal';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const [postUser, setPostUser] = useState<User>();
  const [comment, setComment] = useState<Comment[]>();
  const [isLike, setIsLike] = useState(false);
  const [more, setMore] = useState(false);
  const [likeData, setLikeData] = useState<Like[]>();
  const [openModal, setOpenModal] = useState(false);

  const preRef = useRef(null);
  const { user } = useContext(loginContext);

  const client = useQueryClient();
  const { data: likeQueryData } = useQuery({
    queryKey: ['like', post.postid],
    queryFn: () => getFBLike(post.postid),
  });

  // post user 불러오기
  useEffect(() => {
    if (post.email) {
      getUser(post.email).then((data) => {
        setPostUser(data as User);
      });
    }
  }, []);

  // login user가 like data안에 있을 때
  useEffect(() => {
    if (likeData?.map((data) => data.email)[0] === user?.email) {
      setIsLike(true);
    }
  }, [likeData]);

  // react query를 사용해 가져온 like data를 state로 저장
  useEffect(() => {
    if (likeQueryData) setLikeData(likeQueryData);
  }, [likeQueryData]);

  useEffect(() => {
    getComment(post.postid).then((data: any) => setComment(data));
  }, []);

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

  const handleMore = () => {
    setMore((prev) => !prev);
  };

  const limitTextLines = (text: string, line: number) => {
    const lines = text.split('\n');
    if (lines.length <= line) {
      return text;
    }
    return lines.slice(0, line).join('\n');
  };

  const showMoreButton = (text: string, line: number) => {
    const lines = text.split('\n');
    return lines.length > line;
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <article className="w-full bg-white border flex flex-col p-4 gap-3 mb-10">
        <div className="flex items-center gap-3">
          <img
            src={postUser && postUser.profileImage}
            alt="user"
            className="rounded-full w-8 h-8"
          />
          <div className="text-sm">
            <p className="font-bold">{postUser && postUser.name}</p>
            <p className="text-gray-500">{formattedDate(post.date)}</p>
          </div>
        </div>
        <p className="font-bold text-xl">{post.title}</p>
        <pre className={`relative whitespace-pre-wrap font-sans`} ref={preRef}>
          {more ? post.article : limitTextLines(post.article, 4)}
          {!more && showMoreButton(post.article, 4) && (
            <button
              className="buttom-0 left-0 text-gray-500"
              onClick={handleMore}
            >
              ...더보기
            </button>
          )}
        </pre>
        <div
          className={`w-fit flex items-center gap-1 text-sm cursor-pointer ${
            isLike && 'text-blue-600'
          }`}
          onClick={handleLike}
        >
          {isLike ? (
            <AiFillHeart className="w-4 h-4" />
          ) : (
            <AiOutlineHeart className="w-4 h-4" />
          )}
          <p>좋아요</p>
        </div>
        <div className="flex items-center text-sm gap-1">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleOpenModal}
          >
            <p>좋아요</p>
            <p className="mr-2">{likeData?.length}</p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <p>댓글</p>
            <p>{comment?.length}</p>
          </div>
        </div>
      </article>
      {openModal && (
        <LikeModal likeUser={likeData} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default PostCard;

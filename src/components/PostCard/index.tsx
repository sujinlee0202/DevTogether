import { useEffect, useState, useRef } from 'react';
import { Post, Comment } from '../../types/post';
import { getComment, getUser } from '../../api/firebase';
import { User } from '../../types/user';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { formattedDate } from '../../utils/formattedDate';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const [user, setUser] = useState<User>();
  const [comment, setComment] = useState<Comment[]>();
  const [like, setLike] = useState(false);
  const [more, setMore] = useState(false);
  const preRef = useRef(null);

  useEffect(() => {
    if (post.email) {
      getUser(post.email).then((data) => {
        setUser(data as User);
      });
    }
  }, []);

  useEffect(() => {
    getComment(post.postid).then((data: any) => setComment(data));
  }, []);

  const handleLike = () => {
    setLike((prev) => !prev);
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

  return (
    <article className="w-full bg-white border flex flex-col p-4 gap-3">
      <div className="flex items-center gap-3">
        <img
          src={user && user.profileImage}
          alt="user"
          className="rounded-full w-8 h-8"
        />
        <div className="text-sm">
          <p className="font-bold">{user && user.name}</p>
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
        className={`flex items-center gap-1 text-sm ${like && 'text-blue-600'}`}
        onClick={handleLike}
      >
        {like ? (
          <AiFillHeart className="w-4 h-4" />
        ) : (
          <AiOutlineHeart className="w-4 h-4" />
        )}
        <p>좋아요</p>
      </div>
      <div className="flex items-center text-sm gap-1">
        <p>좋아요</p>
        <p className="mr-2">{post.like}</p>
        <p>댓글</p>
        <p>{comment?.length}</p>
      </div>
    </article>
  );
};

export default PostCard;
import React, { useEffect, useState, useRef, useContext } from 'react';
import { Post } from '../../types/post';
import { getUser } from '../../api/firebase';
import { User } from '../../types/user';
import { formattedDate } from '../../utils/formattedDate';
import { loginContext } from '../../context/loginContext';
import PostProfile from '../PostProfile';
import Reaction from '../Reaction';

interface Props {
  post: any;
}

const PostCard = React.forwardRef<HTMLElement, Props>(({ post }, ref) => {
  const [postUser, setPostUser] = useState<User>();
  const [more, setMore] = useState(false);
  const preRef = useRef(null);
  const { user } = useContext(loginContext);

  // post user 불러오기
  useEffect(() => {
    if (post.email) {
      getUser(post.email).then((data) => {
        setPostUser(data as User);
      });
    }
  }, []);

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
    <article
      className="w-full bg-white border flex flex-col p-4 gap-3 mb-10"
      ref={ref}
    >
      <PostProfile postUser={postUser} date={formattedDate(post.date)} />
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
      <Reaction user={user} post={post} mode="timeline" />
    </article>
  );
});

export default PostCard;

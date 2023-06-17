import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '../../types/user';
import { getUser } from '../../api/firebase';
import { loginContext } from '../../context/loginContext';
import PostProfile from '../../components/PostProfile';
import Reaction from '../../components/Reaction';
import CommentGroup from '../../components/CommentGroup';

const PostDetail = () => {
  const [postUser, setPostUser] = useState<User>();
  const { user } = useContext(loginContext);
  const location = useLocation();
  const { postid, title, email, date, article } = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // post user 불러오기
  useEffect(() => {
    if (email) {
      getUser(email).then((data) => {
        setPostUser(data as User);
      });
    }
  }, [email]);

  return (
    <section className="w-5/6 flex flex-col mx-auto">
      <article className="w-full bg-white border flex flex-col p-4 gap-3  my-10">
        <PostProfile postUser={postUser} date={date} />
        <p className="font-bold text-xl">{title}</p>
        <pre className={`relative whitespace-pre-wrap font-sans`}>
          {article}
        </pre>
        <Reaction user={user} post={location.state} mode="detail" />
      </article>
      <CommentGroup postId={postid} />
    </section>
  );
};

export default PostDetail;

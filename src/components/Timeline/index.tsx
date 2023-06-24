import { useState, useEffect } from 'react';
import { Post } from '../../types/post';
import AddPostBox from '../AddPostBox';
import PostCard from '../PostCard';
import { getPost } from '../../api/firebase';
import AddPostButton from '../AddPostButton';

const Timeline = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPost().then((post) => {
      setPosts(post);
    });
  }, []);

  return (
    <section className="w-5/6 flex flex-col mx-auto">
      <AddPostBox />
      {posts
        .sort((a, b) => b.date.seconds - a.date.seconds)
        .map((post) => (
          <PostCard key={post.postid} post={post} />
        ))}
      <AddPostButton />
    </section>
  );
};

export default Timeline;

import Nav from '../../components/Nav';
import Header from '../../components/Header';
import AddPostBox from '../../components/AddPostBox';
import AddPostButton from '../../components/AddPostButton';
import PostCard from '../../components/PostCard';
import { useEffect, useState } from 'react';
import { getPost } from '../../api/firebase';
import { Post } from '../../types/post';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPost().then((post) => {
      setPosts(post);
    });
  }, []);

  return (
    <>
      <Header />
      <section className="w-5/6 max-w-screen-md mx-auto flex flex-col gap-10">
        <AddPostBox />
        {posts.map((post) => (
          <PostCard key={post.postid} post={post} />
        ))}
      </section>
      <AddPostButton />
      <Nav />
    </>
  );
};

export default Home;

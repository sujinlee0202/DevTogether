import Nav from '../../components/Nav';
import Header from '../../components/Header';
import AddPostBox from '../../components/AddPostBox';
import AddPostButton from '../../components/AddPostButton';
import PostCard from '../../components/PostCard';
import { useEffect, useState } from 'react';
import { getPost } from '../../api/firebase';
import { Post } from '../../types/post';
import PopularPost from '../../components/PopularPost';

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
      <div className="flex w-full max-w-screen-lg mx-auto gap-10">
        <section className="w-5/6 flex flex-col mx-auto">
          <AddPostBox />
          {posts
            .sort((a, b) => b.date.seconds - a.date.seconds)
            .map((post) => (
              <PostCard key={post.postid} post={post} />
            ))}
        </section>
        <PopularPost posts={posts} />
      </div>
      <AddPostButton />
      <Nav />
    </>
  );
};

export default Home;

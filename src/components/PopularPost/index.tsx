import { useEffect, useState } from 'react';
import { Post } from '../../types/post';
import { getFBLike } from '../../api/firebase';
import Rank from './Rank';

interface Props {
  posts: Post[];
}

const PopularPost = ({ posts }: Props) => {
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getSortedPosts = async () => {
      const sorted = await Promise.all(
        posts.map(async (post) => {
          const data = await getFBLike(post.postid);
          return { ...post, likeCount: data.length };
        }),
      );
      sorted.sort((a, b) => b.likeCount - a.likeCount);
      setSortedPosts(sorted);
    };

    getSortedPosts();
  }, [posts]);

  return (
    <section className="my-10 h-full w-2/5 bg-white border hidden md:block">
      <p className="w-full font-bold text-xl p-4">⭐ 인기 TOP 10</p>
      <p className="text-sm mb-3 px-4">지금 가장 HOT한 게시물들이에요!</p>
      <div className="flex flex-col">
        {sortedPosts.slice(0, 10).map((data, index) => (
          <Rank key={index} data={data} rank={index} />
        ))}
      </div>
    </section>
  );
};

export default PopularPost;

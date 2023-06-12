import { useEffect, useState } from 'react';
import { Post } from '../../types/post';
import { getFBLike, getPost } from '../../api/firebase';
import Rank from './Rank';
import { useQuery } from '@tanstack/react-query';

const PopularPost = () => {
  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: PostData } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPost(),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (PostData) setPosts(PostData);
  }, [PostData]);

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

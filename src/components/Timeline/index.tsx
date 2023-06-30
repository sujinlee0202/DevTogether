import { useRef, useCallback } from 'react';
import AddPostBox from '../AddPostBox';
import PostCard from '../PostCard';
import { first, next } from '../../api/firebase';
import AddPostButton from '../AddPostButton';
import { useInfiniteQuery } from '@tanstack/react-query';

const Timeline = () => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: ({ pageParam }) => {
        return pageParam ? next(pageParam) : first();
      },
      getNextPageParam: (querySnapshots) => {
        if (querySnapshots.size < 5) return undefined;
        else return querySnapshots.docs[querySnapshots.docs.length - 1];
      },
    });

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (post: HTMLElement) => {
      // next page를 loading중이라면 return
      if (isFetchingNextPage) return;

      // observerRef 가 존재한다면 target의 관찰을 중지한다.
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((posts) => {
        console.log('intersection posts', posts[0].isIntersecting);
        // isIntersecting : target 요소와 상위 요소의 교차 여부를 알려준다.
        // target과 상위요소가 교차됬고 다음 페이지가 존재할 때 fetchNextPage 함수 호출
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('end page');
          fetchNextPage();
        }
      });

      // 다음 관찰 요소 관찰 시작
      if (post) {
        observerRef.current.observe(post);
      }
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  return (
    <section className="w-5/6 flex flex-col mx-auto">
      <AddPostBox />
      {data?.pages[0].docs
        .map((doc) => doc.data())
        .map((post) => (
          <PostCard key={post.postid} post={post} ref={lastPostRef} />
        ))}
      <AddPostButton />
    </section>
  );
};

export default Timeline;

import { useMutation, useQuery } from '@tanstack/react-query';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { getFBComment, getUser, setFBComment } from '../../api/firebase';
import { useContext, useEffect } from 'react';
import { loginContext } from '../../context/loginContext';
import CommentBox from '../CommentBox';

interface Props {
  postId: string;
}

const CommentGroup = ({ postId }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const { user } = useContext(loginContext);

  const { data: loginUser, refetch: refetchLoginUser } = useQuery({
    queryKey: ['loginUser'],
    queryFn: async () => user && getUser(user?.email),
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: (data: any) => setFBComment(data),
  });

  const { data: commentData, refetch: refetchComment } = useQuery({
    queryKey: ['comment', postId],
    queryFn: async () => getFBComment(postId),
    staleTime: 1000 * 60 * 5,
  });

  const date = new Date();

  useEffect(() => {
    if (mutation.isSuccess) {
      refetchComment();
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    refetchLoginUser();
  }, [user]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { email, profileImage, name }: any = loginUser;
    if (loginUser) {
      mutation.mutate({
        postId,
        email,
        profileImage,
        comment: data.comment,
        name,
        date,
      });
    }
    reset();
  };

  return (
    <>
      <p className="mb-4 text-xl font-bold">
        댓글 <span>{commentData?.length}</span>
      </p>
      <div className="flex flex-col border border-gray-300">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-16 flex items-center pl-4 bg-white text-sm">
            <img
              src={loginUser && loginUser.profileImage}
              className="rounded-full mr-4"
            ></img>
            <textarea
              className="resize-none w-full h-16 flex-grow flex items-center py-5 outline-none"
              placeholder="댓글을 남겨보세요."
              {...register('comment', {
                required: true,
              })}
            />
            <div className="w-20 h-full flex items-center justify-center">
              <button
                className={`px-2 py-1 text-white rounded-md ${
                  isValid ? 'bg-red-500' : 'bg-red-300'
                }`}
              >
                등록
              </button>
            </div>
          </div>
        </form>
        {commentData?.length !== 0 && <CommentBox comment={commentData} />}
      </div>
    </>
  );
};

export default CommentGroup;

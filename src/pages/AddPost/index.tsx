import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Post } from '../../types/post';
import { useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { setPost } from '../../api/firebase';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';

const AddPostPage = () => {
  const { user } = useContext(loginContext);
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<Post>({
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Post> = (data, event) => {
    event?.preventDefault();
    if (user) {
      setPost({
        ...data,
        email: user.email,
        postid: uuidv4(),
        date: Timestamp.fromDate(new Date()),
        like: 0,
        comment: [],
      }).then(() => navigate('/'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col box-border w-full max-w-[640px] h-full min-h-[100vh] m-auto sm:border-r sm:border-l bg-white"
    >
      {/** AddPostPage 상단 */}
      <div className="flex items-center justify-between border-b">
        {/** 뒤로가기 */}
        <Link to="/" className="text-xl px-2 py-4">
          <AiOutlineArrowLeft />
        </Link>
        <button
          type="submit"
          className={`w-16 py-2 rounded-md text-white mr-2 ${
            isValid ? 'bg-red-500' : 'bg-red-300'
          } text-sm`}
        >
          완료
        </button>
      </div>
      {/** 글쓰기 */}
      <div className="h-full flex flex-col my-10 mx-20 gap-4 flex-grow">
        <input
          type="text"
          placeholder="제목을 입력해 주세요"
          className="text-lg font-bold"
          {...register('title')}
        />
        <textarea
          className="resize-none w-full h-full flex-grow outline-none"
          placeholder="나누고 싶은 생각을 적어주세요."
          {...register('article', {
            required: true,
          })}
        />
      </div>
    </form>
  );
};

export default AddPostPage;

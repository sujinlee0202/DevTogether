import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  ERROR_MSG_EMAIL_PATTERN,
  ERROR_MSG_LOGIN_CORRECT_PW,
  ERROR_MSG_LOGIN_NOT_USER,
  ERROR_MSG_MAX_LENGTH_30,
  ERROR_MSG_MIN_LENGTH_6,
  ERROR_MSG_PASSWORD_PATTERN,
  ERROR_MSG_REQUIRED,
} from '../../utils/error-message';
import { User } from '../../types/user';
import { getUser, login } from '../../api/firebase';
import { useState, useContext } from 'react';
import { loginContext } from '../../context/loginContext';

const LogIn = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<User>({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const { setUser } = useContext(loginContext);

  const [isUser, setIsUser] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const onSubmit: SubmitHandler<User> = (data, event) => {
    event?.preventDefault();

    // 로그인하기
    login(data.email, data.password)
      .then((user) => {
        getUser(data.email).then((dbUser) => {
          setUser && setUser({ ...user, dbUser });
          sessionStorage.setItem('user', JSON.stringify({ ...user, dbUser }));
        });
        navigate('/');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setIsUser(true);
          setIsPassword(false);
        } else if (error.code === 'auth/wrong-password') {
          setIsUser(false);
          setIsPassword(true);
        }
      });
  };

  return (
    <section className="box-border w-full max-w-[640px] h-full min-h-[100vh] m-auto sm:border-r sm:border-l bg-white">
      <div className="flex items-center text-xl gap-5 px-12 py-4 border-b">
        <div className="font-bold">로그인</div>
      </div>

      {/** 로그인 Container */}
      <div className="w-full px-12">
        {/** 회원가입 페이지로 이동 */}
        <div className="w-full p-4 bg-gray-200 rounded-lg my-4">
          <p className="text-center">
            회원이 아니신가요?
            <Link
              to="/signup"
              className="text-center pl-1 text-red-500 underline font-bold"
            >
              회원가입 하기
            </Link>
          </p>
        </div>

        {/** 로그인 폼 */}
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          {/** input 입력 부분 */}
          <Input
            text="이메일"
            type="email"
            placeholder="devvalue@gmail.com"
            register={register('email', {
              required: {
                value: true,
                message: ERROR_MSG_REQUIRED,
              },
              maxLength: {
                value: 30,
                message: ERROR_MSG_MAX_LENGTH_30,
              },
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: ERROR_MSG_EMAIL_PATTERN,
              },
            })}
            error={errors.email}
          />
          <Input
            text="비밀번호"
            type="password"
            placeholder="영문, 숫자 포함 6자 이상"
            register={register('password', {
              required: ERROR_MSG_REQUIRED,
              minLength: {
                value: 6,
                message: ERROR_MSG_MIN_LENGTH_6,
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                message: ERROR_MSG_PASSWORD_PATTERN,
              },
            })}
            error={errors.password}
          />
          <div className="py-1 text-red-600 text-center">
            {isUser && ERROR_MSG_LOGIN_NOT_USER}
            {isPassword && ERROR_MSG_LOGIN_CORRECT_PW}
          </div>
          {/** 회원가입 버튼 */}
          <Button active={isValid} text="로그인 하기" />
        </form>
      </div>
    </section>
  );
};

export default LogIn;

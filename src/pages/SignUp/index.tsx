import { useRef, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ERROR_MSG_EMAIL_PATTERN,
  ERROR_MSG_LOGIN_ALREADY_USER,
  ERROR_MSG_MAX_LENGTH_20,
  ERROR_MSG_MAX_LENGTH_30,
  ERROR_MSG_MIN_LENGTH_6,
  ERROR_MSG_PASSWORD_PATTERN,
  ERROR_MSG_REQUIRED,
  ERROR_MSG_VALIDATE,
} from '../../utils/error-message';
import Terms from '../../components/Terms';
import { Inputs } from '../../types/signup';
import { setSignUp, setUser } from '../../api/firebase';
import { Timestamp } from 'firebase/firestore';
import gravatar from 'gravatar';

/**
 * 회원가입 페이지
 */
const SignUp = () => {
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');
  const navigate = useNavigate();

  const [alreadyUser, setAlreadyUser] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // backend로 회원가입 정보 보내기
    setSignUp(data.email, data.password)
      .then((user) => {
        setUser({
          uid: user.uid,
          name: data.name,
          email: data.email,
          password: '',
          profileImage: gravatar.url(data.name, { s: '28px', d: 'retro' }),
          signupDate: Timestamp.fromDate(new Date()),
          marketing_agree: !!data.marketing,
          age_agree: !!data.age,
          privacy_agree: !!data.privacy,
          terms_of_use_agree: !!data.terms_of_use,
        });
        navigate('/login');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') setAlreadyUser(true);
        else setAlreadyUser(false);
      });
  };

  return (
    <section className="box-border w-full max-w-[640px] h-full min-h-[100vh] m-auto sm:border-r sm:border-l bg-white">
      {/** 뒤로가기 */}
      <Link
        to="/login"
        className="flex items-center text-xl gap-5 px-2 py-4 border-b"
      >
        <AiOutlineArrowLeft />
        <div className="font-bold">회원가입</div>
      </Link>

      {/** 회원가입 Container */}
      <div className="w-full px-12">
        {/** 로그인 페이지로 이동 */}
        <div className="w-full p-4 bg-gray-200 rounded-lg my-4">
          <p className="text-center">
            이미 회원이신가요?
            <Link
              to="/login"
              className="text-center pl-1 text-red-500 underline font-bold"
            >
              로그인 하기
            </Link>
          </p>
        </div>

        {/** 회원가입 폼 */}
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          {/** input 입력 부분 */}
          <Input
            text="프로필 이름"
            type="text"
            placeholder="프로필 이름"
            register={register('name', {
              required: {
                value: true,
                message: ERROR_MSG_REQUIRED,
              },
              maxLength: {
                value: 20,
                message: ERROR_MSG_MAX_LENGTH_20,
              },
            })}
            error={errors.name}
          />
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
          <Input
            text="비밀번호 확인"
            type="password"
            placeholder="영문, 숫자 포함 6자 이상"
            register={register('password_confirm', {
              required: ERROR_MSG_REQUIRED,
              minLength: {
                value: 6,
                message: ERROR_MSG_MIN_LENGTH_6,
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                message: ERROR_MSG_PASSWORD_PATTERN,
              },
              validate: (value) => {
                if (value === passwordRef.current) return true;
                else if (value !== passwordRef.current)
                  return ERROR_MSG_VALIDATE;
              },
            })}
            error={
              watch('password') !== watch('password_confirm')
                ? isValid
                  ? undefined
                  : errors.password_confirm
                : undefined
            }
          />

          {/** 이용 약관 */}
          <Terms
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
          <div className="text-red-600 text-center">
            {alreadyUser && ERROR_MSG_LOGIN_ALREADY_USER}
          </div>
          {/** 회원가입 버튼 */}
          <Button active={isValid} text="회원가입 하기" />
        </form>
      </div>
    </section>
  );
};

export default SignUp;

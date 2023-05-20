import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp = () => {
  const [active, setActive] = useState(false);

  return (
    <section className="box-border w-full max-w-[640px] h-full min-h-[100vh] m-auto sm:border-r sm:border-l bg-white">
      <div className="flex items-center text-xl gap-5 px-2 py-4 border-b">
        <AiOutlineArrowLeft />
        <div className="font-bold">회원가입</div>
      </div>
      <div className="w-full px-12">
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
        <form className="flex flex-col gap-2">
          {/** input 입력 부분 */}
          <Input text="프로필 이름" type="text" placeholder="프로필 이름" />
          <Input text="이메일" type="text" placeholder="devvalue@gmail.com" />
          <Input
            text="비밀번호"
            type="password"
            placeholder="영문, 숫자 포함 6자 이상"
          />
          <Input
            text="비밀번호 확인"
            type="password"
            placeholder="영문, 숫자 포함 6자 이상"
          />
          {/** 이용 약관 */}
          <div className="flex flex-col my-2 gap-2">
            <CheckBox text="모두 동의" />
            <CheckBox text="(필수) 만 14세 이상입니다." />
            <CheckBox text="(필수) 개발가치 이용약관 동의" />
            <CheckBox text="(필수) 개발가치 개인정보 수집 · 이용 동의" />
            <CheckBox text="(선택) 마케팅 정보 수신 동의" />
          </div>
          <Button active={active} text="회원가입 하기" />
        </form>
      </div>
    </section>
  );
};

export default SignUp;

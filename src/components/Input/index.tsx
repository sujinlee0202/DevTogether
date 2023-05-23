import { FieldError } from '../../types/react-hook-form';
import { useState, useEffect } from 'react';

interface Props {
  text: string;
  type: string;
  placeholder: string;
  register: {
    name: string;
  };
  error?: FieldError | undefined;
}

const Input = ({ text, type, placeholder, register, error }: Props) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error) setIsError(true);
    else setIsError(false);
    return () => {};
  }, [error]);

  return (
    <div className="flex flex-col w-full gap-1">
      <label className="shrink-0 font-bold">{text}</label>
      <input
        type={type}
        className={`border w-full h-10 px-2 ${
          isError ? 'border-red-600' : 'border-gray-200'
        }`}
        placeholder={placeholder}
        {...register}
      ></input>
      {error && error.type === 'required' && (
        <span className="text-red-600">{error.message}</span>
      )}
      {error && error.type === 'maxLength' && (
        <span className="text-red-600">{error.message}</span>
      )}
      {error && error.type === 'pattern' && (
        <span className="text-red-600">{error.message}</span>
      )}
      {error && error.type === 'minLength' && (
        <span className="text-red-600">{error.message}</span>
      )}
      {error && error.type === 'validate' && (
        <span className="text-red-600">{error.message}</span>
      )}
    </div>
  );
};

export default Input;

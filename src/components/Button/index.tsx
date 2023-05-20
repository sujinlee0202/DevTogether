import React from 'react';

interface Props {
  active: boolean;
  text: string;
}

const Button = ({ active, text }: Props) => {
  return (
    <button
      className={`w-full p-2 rounded-lg font-bold text-white mb-2 ${
        active ? 'bg-red-500' : 'bg-red-300'
      }`}
    >
      {text}
    </button>
  );
};

export default Button;

interface Props {
  text: string;
  type: string;
  placeholder: string;
}

const Input = ({ text, type, placeholder }: Props) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <label className="shrink-0 font-bold">{text}</label>
      <input
        type={type}
        className="border w-full h-10 px-2"
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default Input;

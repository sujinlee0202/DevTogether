interface Props {
  text: string;
}

const CheckBox = ({ text }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <input type="checkbox" className="w-4 h-4 shrink-0"></input>
      <label>{text}</label>
    </div>
  );
};

export default CheckBox;

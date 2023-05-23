import { FieldError } from '../../types/react-hook-form';

interface Props {
  text: string;
  register: {
    name: string;
  };
  error?: FieldError | undefined;
  checked?: boolean;
}

const CheckBox = ({ text, register, error, checked }: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        className="w-4 h-4 shrink-0"
        {...register}
        checked={checked}
      ></input>
      <label>{text}</label>
      {error && error.type === 'required' && (
        <span className="text-red-600">{error.message}</span>
      )}
    </div>
  );
};

export default CheckBox;

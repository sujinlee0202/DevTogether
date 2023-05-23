import CheckBox from '../CheckBox';
import { ERROR_MSG_TERMS } from '../../utils/error-message';

interface Props {
  errors: any;
  register: any;
  watch: any;
  setValue: any;
}

const Terms = ({ errors, register, watch, setValue }: Props) => {
  const handleCheckedAll = () => {
    if (
      watch('terms_of_use') &&
      watch('age') &&
      watch('privacy') &&
      watch('marketing')
    ) {
      setValue('all', false);
      setValue('age', false);
      setValue('terms_of_use', false);
      setValue('privacy', false);
      setValue('marketing', false);
    } else {
      setValue('all', true);
      setValue('age', true);
      setValue('terms_of_use', true);
      setValue('privacy', true);
      setValue('marketing', true);
    }
  };

  const handleChecked = () => {
    setValue('all', false);
  };

  return (
    <div className="flex flex-col my-2 gap-2">
      <CheckBox
        text="모두 동의"
        register={register('all', {
          onChange: handleCheckedAll,
        })}
      />
      <CheckBox
        text="(필수) 만 14세 이상입니다."
        register={register('age', {
          required: ERROR_MSG_TERMS,
          onChange: handleChecked,
        })}
        error={watch('age') ? undefined : errors.age}
      />
      <CheckBox
        text="(필수) 개발가치 이용약관 동의"
        register={register('terms_of_use', {
          required: ERROR_MSG_TERMS,
          onChange: handleChecked,
        })}
        error={watch('terms_of_use') ? undefined : errors.terms_of_use}
      />
      <CheckBox
        text="(필수) 개발가치 개인정보 수집 · 이용 동의"
        register={register('privacy', {
          required: ERROR_MSG_TERMS,
          onChange: handleChecked,
        })}
        error={watch('privacy') ? undefined : errors.privacy}
      />
      <CheckBox
        text="(선택) 마케팅 정보 수신 동의"
        register={register('marketing', {
          onChange: handleChecked,
        })}
      />
    </div>
  );
};

export default Terms;

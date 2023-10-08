import useFocus from '@/hook/useFocus';
import { ChangeEvent, InputHTMLAttributes, useRef } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ id, placeholder, value, ...rest }: TextInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { isFocus, onFocus, onBlur } = useFocus();

  return (
    <label htmlFor={id} className="relative">
      <span className={getLabelStyle(isFocus, value.length)}>
        {placeholder}
      </span>
      <input
        ref={ref}
        id={id}
        type="text"
        className={getInputStyle(isFocus)}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      />
    </label>
  );
};

const getLabelStyle = (isFocus: boolean, length: number) => {
  const scaleSmall = 'translate-y-1 scale-75 text-text';
  const scaleLarge = 'translate-y-4 scale-100 text-textLight';

  return `absolute px-2 transform ${
    isFocus || length > 0 ? scaleSmall : scaleLarge
  }`;
};

const getInputStyle = (isFocus: boolean) => {
  const focusStyle = 'bg-white border-primary';
  const blurStyle = 'bg-neutralText border-border';

  return `w-full h-14 pt-4 px-4 rounded-md border outline-none ${
    isFocus ? focusStyle : blurStyle
  }`;
};

export default TextInput;

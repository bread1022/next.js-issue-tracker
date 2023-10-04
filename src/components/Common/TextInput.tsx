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
      <span
        className={`absolute px-2 transform ${
          isFocus || value.length > 0 ? scaleSmall : scaleLarge
        }`}
      >
        {placeholder}
      </span>
      <input
        ref={ref}
        id={id}
        type="text"
        className={`w-full h-14 pt-4 px-4 rounded-md border outline-none ${
          isFocus ? 'bg-white border-primary' : 'bg-neutralText border-border'
        }`}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      />
    </label>
  );
};

const scaleSmall = 'translate-y-1 scale-75 text-text';
const scaleLarge = 'translate-y-4 scale-100 text-textLight';

export default TextInput;

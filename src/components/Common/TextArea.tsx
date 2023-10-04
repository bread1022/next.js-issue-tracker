import useFocus from '@/hook/useFocus';
import { useRef, TextareaHTMLAttributes, ChangeEvent } from 'react';
import Icon from '../ui/Icon';
import useAutoSizeTextArea from '@/hook/useAutoSizeTextArea';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = ({ id, placeholder, value, ...rest }: TextAreaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const { isFocus, onFocus, onBlur } = useFocus();
  const length = value.length;

  // TODO : 파일 첨부해서 바로 화면에 보여주기
  const handleFileInput = () => console.log('파일 첨부하기');

  useAutoSizeTextArea({ ref: ref.current, value });

  return (
    <div
      className={`relative rounded-md border ${
        isFocus ? 'bg-white border-primary' : 'bg-neutralText border-border'
      }`}
    >
      <label htmlFor={id} className="block">
        <span
          className={`absolute px-2 transform ${
            isFocus || length > 0 ? scaleSmall : sacleLarge
          }`}
        >
          {placeholder}
        </span>
        <textarea
          ref={ref}
          id={id}
          className={`w-full min-h-[15rem] max-h-96 mt-7 px-4 bg-transparent outline-none resize-none`}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
      </label>
      {length > 0 && (
        <span className="absolute bottom-11 right-1 text-xs text-textLight">
          띄어쓰기 포함 {length} 자
        </span>
      )}
      <label
        htmlFor="files"
        className={`h-10 px-3 flex items-center gap-2 cursor-pointer border-t border-dashed ${
          isFocus ? 'border-primary' : 'border-border'
        }`}
      >
        <Icon name="Clip" />
        <span className="text-xs">파일 첨부하기</span>
        <input
          id="files"
          type="file"
          className="hidden"
          accept="image/jpg, image/png, image/jpeg, image/gif"
          onChange={handleFileInput}
        />
      </label>
    </div>
  );
};

const scaleSmall = 'translate-y-1 -translate-x-4 scale-75 text-text';
const sacleLarge = 'translate-y-4 scale-100 text-textLight';

export default TextArea;

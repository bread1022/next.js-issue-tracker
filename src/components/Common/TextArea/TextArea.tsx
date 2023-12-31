import useFocus from '@/hook/useFocus';
import { useRef, TextareaHTMLAttributes, useState } from 'react';
import Icon from '../../ui/Icon';
import useAutoSizeTextArea from '@/hook/useAutoSizeTextArea';
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  placeholder: string;
  value: string;
  half?: boolean;
}

const TextArea = ({
  id,
  placeholder,
  value,
  half = false,
  ...rest
}: TextAreaProps) => {
  const { isFocus, onFocus, onBlur } = useFocus();
  const ref = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState<File[]>([]);
  const length = value.length;

  const handleFileInput = () => {
    const file = fileRef.current?.files;
    if (file) {
      //TODO: 사용자가 파일을 첨부하면, url로 변경해서 ![filename](url) 형식으로 textarea에 마지막 커서 뒤에 위치시킨다.
      console.log(file);
      const fileArr = Array.from(file);
      const url = fileArr.map((file) => {
        return `![${file.name}](url)`;
      });
    }
  };

  useAutoSizeTextArea({ ref: ref.current, value });

  return (
    <div className={getTextAreaStyle(isFocus, half)}>
      <label htmlFor={id} className="block">
        {half || (
          <span className={getPlaceholderStyle(isFocus, length)}>
            {placeholder}
          </span>
        )}
        <textarea
          ref={ref}
          id={id}
          className={getTextAreaHeight(half)}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={half ? placeholder : ''}
          {...rest}
        />
      </label>
      {length > 0 && (
        <span className="absolute bottom-11 right-1 text-xs text-textLight">
          띄어쓰기 포함 {length} 자
        </span>
      )}
      <label htmlFor="files" className={getFileBorderStyle(isFocus, half)}>
        <Icon name="Clip" />
        <span className="text-xs">파일 첨부하기</span>
        <input
          ref={fileRef}
          id="files"
          type="file"
          className="hidden"
          accept="image/jpg, image/png, image/jpeg, image/gif"
          onChange={handleFileInput}
          multiple
        />
      </label>
    </div>
  );
};

const getTextAreaStyle = (isFocus: boolean, half: boolean) => {
  return half
    ? 'relative bg-white rounded-b-lg'
    : `relative rounded-lg border ${
        isFocus ? 'bg-white border-primary' : 'bg-neutralText border-border'
      }`;
};

const getPlaceholderStyle = (isFocus: boolean, length: number) => {
  const scaleSmall = 'translate-y-1 -translate-x-4 scale-75 text-text';
  const sacleLarge = 'translate-y-4 scale-100 text-textLight';
  return `absolute px-2 transform ${
    isFocus || length > 0 ? scaleSmall : sacleLarge
  } transition-all duration-300`;
};

const getTextAreaHeight = (half: boolean) => {
  return `w-full bg-transparent outline-none resize-none ${
    half ? 'min-h-[5rem] max-h-12 p-3' : 'min-h-[15rem] max-h-96 mt-7 px-4'
  }`;
};

const getFileBorderStyle = (isFocus: boolean, half: boolean) => {
  return `h-10 px-3 flex items-center gap-2 cursor-pointer border-t border-dashed ${
    isFocus ? half || 'border-primary' : 'border-border'
  }`;
};

export default TextArea;

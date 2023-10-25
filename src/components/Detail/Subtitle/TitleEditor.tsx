import useFocus from '@/hook/useFocus';
import { HTMLAttributes, forwardRef } from 'react';

interface TitleEditorProps extends HTMLAttributes<HTMLInputElement> {
  id: string;
  title?: string;
  isEdit: boolean;
}

const TitleEditor = forwardRef<HTMLInputElement, TitleEditorProps>(
  ({ id, title, isEdit, ...rest }, ref) => {
    const { isFocus, onFocus, onBlur } = useFocus();

    return (
      <>
        {isEdit ? (
          <label htmlFor="issue-title" className="relative flex items-center">
            <span className="absolute px-5">제목</span>
            <input
              ref={ref}
              id="issue-title"
              type="text"
              className={getTitleStyle(isFocus)}
              value={title}
              onFocus={onFocus}
              onBlur={onBlur}
              autoFocus
              {...rest}
            />
          </label>
        ) : (
          <div className="flex gap-5 text-2xl items-center truncate">
            <h3 className="text-textDark">{title}</h3>
            <span className="truncate">#{id}</span>
          </div>
        )}
      </>
    );
  },
);

const getTitleStyle = (isFocus: boolean) => {
  const focusStyle = 'bg-white border-primary';
  const blurStyle = 'bg-neutralText border-border';
  return `w-full h-10 px-32 rounded-md border outline-none ${
    isFocus ? focusStyle : blurStyle
  }`;
};

export default TitleEditor;

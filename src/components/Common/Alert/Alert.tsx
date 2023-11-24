import { createPortal } from 'react-dom';

export enum AlertType {
  cancel = '취소',
  confirm = '확인',
}

interface AlertProps {
  message: string;
  type: {
    value: AlertType;
    onClick: () => void;
  }[];
}

const Alert = ({ message, type }: AlertProps) => {
  if (typeof window === 'undefined') return null;
  return createPortal(
    <div className="fixed z-10 w-full h-full top-0 left-0 bg-alert flex justify-center items-center">
      <div className="h-32 w-80 bg-white rounded-lg shadow-md">
        <div className="h-3/5 flex justify-center items-center text-textDark">
          {message}
        </div>
        <div className="h-2/5 flex justify-between gap-2 pb-2 px-4">
          {type.map(({ value, onClick }) => (
            <button
              key={value}
              onClick={onClick}
              className="w-full rounded-sm shadow-md first:bg-neutral last:bg-secondary last:text-white hover:font-semibold hover:shadow-inner"
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Alert;

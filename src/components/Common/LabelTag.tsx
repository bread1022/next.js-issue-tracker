interface LabelTagProps {
  labelName: string;
  backgroundColor: string;
  fontColor: 'white' | 'black';
}

const LabelTag = ({ labelName, backgroundColor, fontColor }: LabelTagProps) => {
  const textColor = fontColor === 'white' ? 'text-white' : 'text-black';

  return (
    <div
      className={`rounded-full py-1 px-2 text-xs ${textColor} max-w-[100px] truncate`}
      style={{ backgroundColor }}
    >
      {labelName}
    </div>
  );
};

export default LabelTag;

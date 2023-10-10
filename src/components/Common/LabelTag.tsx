interface LabelTagProps {
  labelName: string;
  backgroundColor: string;
  fontColor: 'white' | 'black';
}

const LabelTag = ({ labelName, backgroundColor, fontColor }: LabelTagProps) => {
  return (
    <div className={getLabelStyle(fontColor)} style={{ backgroundColor }}>
      {labelName}
    </div>
  );
};

const getLabelStyle = (fontColor: 'white' | 'black') => {
  const textColor = fontColor === 'white' ? 'text-white' : 'text-black';
  return `rounded-full py-1 px-3 text-xs ${textColor} w-max max-w-[100px] truncate`;
};

export default LabelTag;

import LabelTag from '@/components/Common/LabelTag';

interface SelectedLabelsProps {
  labels: {
    labelName: string;
    backgroundColor: string;
    fontColor: 'white' | 'black';
  }[];
}

const SelectedLabels = ({ labels }: SelectedLabelsProps) => {
  return (
    <ul className="grid grid-cols-4 gap-1">
      {labels.map(({ labelName, backgroundColor, fontColor }) => (
        <li key={labelName}>
          <LabelTag
            labelName={labelName}
            backgroundColor={backgroundColor}
            fontColor={fontColor}
          />
        </li>
      ))}
    </ul>
  );
};

export default SelectedLabels;

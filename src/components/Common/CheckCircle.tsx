import Icon from '../ui/Icon';

interface CheckCircleProps {
  id: number;
  checked: boolean;
  onClick: (id: number) => void;
}

const CheckCircle = ({ id, checked, onClick }: CheckCircleProps) => {
  const handleCheckCircleClick = () => onClick(id);

  return (
    <button onClick={handleCheckCircleClick} className="cursor-pointer m-auto">
      {checked ? <Icon name="UnCheckCircle" /> : <Icon name="CheckCircle" />}
    </button>
  );
};

export default CheckCircle;

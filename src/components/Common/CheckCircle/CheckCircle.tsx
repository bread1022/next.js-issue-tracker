import Icon from '../../ui/Icon';

interface CheckCircleProps {
  checked: boolean;
}

const CheckCircle = ({ checked }: CheckCircleProps) => {
  return (
    <div className="m-auto">
      {checked ? <Icon name="CheckCircle" /> : <Icon name="UnCheckCircle" />}
    </div>
  );
};

export default CheckCircle;

import Button from '../../Common/Button';
import Icon from '../../ui/Icon';

interface LabelBtnProps {
  count?: number;
}

const LabelBtn = ({ count }: LabelBtnProps) => {
  return (
    <Button.Link href={'/label'}>
      <Icon name="Label" />
      레이블
      {!!count && <p className="text-xs">({count})</p>}
    </Button.Link>
  );
};

export default LabelBtn;

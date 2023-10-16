import Button from '@/components/Common/Button';
import Icon from '@/components/ui/Icon';

interface SubmitCommentBtnProps {
  active: boolean;
  onSubmit: () => void;
}

const SubmitCommentBtn = ({ active, onSubmit }: SubmitCommentBtnProps) => {
  return (
    <div className="justify-self-end">
      <Button active={active} mode="primary" type="submit" onClick={onSubmit}>
        <Icon name="Plus" color="white" />
        코맨트 작성
      </Button>
    </div>
  );
};

export default SubmitCommentBtn;

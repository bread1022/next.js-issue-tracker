import Button from '@/components/Common/Button';

interface SubmitBtnProps {
  active: boolean;
  onClick: () => void;
}

const SubmitBtn = ({ active, onClick }: SubmitBtnProps) => {
  return (
    <Button
      type="submit"
      mode="primary"
      size="lg"
      active={active}
      onClick={onClick}
    >
      완료
    </Button>
  );
};

export default SubmitBtn;

import Button from '@/components/Common/Button';

interface SubmitBtnProps {
  active: boolean;
  onClick: () => void;
}

const SubmitBtn = ({ active, onClick }: SubmitBtnProps) => {
  return (
    <div className="h-10 col-start-3">
      <Button
        type="submit"
        mode="primary"
        size="lg"
        active={active}
        onClick={onClick}
      >
        완료
      </Button>
    </div>
  );
};

export default SubmitBtn;

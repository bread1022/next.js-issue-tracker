import Button from '@/components/Common/Button';
import Icon from '@/components/ui/Icon';

interface CancleBtnProps {
  onClick: () => void;
}

export default function CancleBtn({ onClick }: CancleBtnProps) {
  return (
    <div className="col-start-2 justify-self-end">
      <Button mode="ghost" onClick={onClick}>
        <Icon name="Close" />
        작성취소
      </Button>
    </div>
  );
}

import Button from '@/components/Common/Button';
import Icon from '@/components/ui/Icon';

interface DeleteBtnProps {
  onDelete: () => void;
}

const DeleteBtn = ({ onDelete }: DeleteBtnProps) => {
  return (
    <div className="flex justify-end text-red text-xs">
      <Button onClick={onDelete} mode="ghost">
        <Icon name="Trash" color="red" />
        이슈 삭제
      </Button>
    </div>
  );
};

export default DeleteBtn;

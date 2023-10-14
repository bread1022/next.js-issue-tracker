import Button from '@/components/Common/Button';
import Icon from '@/components/ui/Icon';

interface EditBtnsProps {
  active: boolean;
  isEdit: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const EditBtns = ({ active, isEdit, onCancel, onSubmit }: EditBtnsProps) => {
  return (
    <>
      {isEdit && (
        <div className="flex justify-end gap-3 pt-4">
          <Button mode="primaryGhost" onClick={onCancel}>
            <Icon name="Close" color="primary" />
            편집 취소
          </Button>
          <Button
            active={active}
            mode="primary"
            type="submit"
            onClick={onSubmit}
          >
            <Icon name="Edit" color="white" />
            편집 완료
          </Button>
        </div>
      )}
    </>
  );
};

export default EditBtns;

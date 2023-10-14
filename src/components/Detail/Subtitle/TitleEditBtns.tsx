import Button from '@/components/Common/Button';
import Icon from '@/components/ui/Icon';

interface TitleEditBtnsProps {
  isEdit: boolean;
  isOpened: boolean;
  active: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: () => void;
  onOpen: () => void;
  onClose: () => void;
}

const TitleEditBtns = ({
  isEdit,
  isOpened,
  active,
  onCancel,
  onEdit,
  onSubmit,
  onOpen,
  onClose,
}: TitleEditBtnsProps) => {
  return (
    <>
      {isEdit ? (
        <Button mode="primaryGhost" onClick={onCancel}>
          <Icon name="Close" color="primary" />
          편집취소
        </Button>
      ) : (
        <Button mode="primaryGhost" onClick={onEdit}>
          <Icon name="Edit" color="primary" />
          제목편집
        </Button>
      )}
      {!isEdit &&
        (isOpened ? (
          <Button mode="primaryGhost" onClick={onClose}>
            <Icon name="CloseIssue" color="primary" />
            이슈닫기
          </Button>
        ) : (
          <Button mode="primaryGhost" onClick={onOpen}>
            <Icon name="OpenIssue" color="primary" />
            이슈열기
          </Button>
        ))}
      {isEdit && (
        <Button active={active} type="submit" mode="primary" onClick={onSubmit}>
          <Icon name="Edit" color="white" />
          편집완료
        </Button>
      )}
    </>
  );
};

export default TitleEditBtns;

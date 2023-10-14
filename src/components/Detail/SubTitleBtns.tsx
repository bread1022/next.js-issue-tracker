import Button from '@/components/Common/Button';
import Icon from '@/components/ui/Icon';

interface SubTitleBtnsProps {
  isEdit: boolean;
  isOpened: boolean;
  onCancel: () => void;
  onEditClick: () => void;
  onEditComplete: () => void;
  onIssueOpen: () => void;
  onIssueClose: () => void;
}

const SubTitleBtns = ({
  isEdit,
  isOpened,
  onCancel,
  onEditClick,
  onEditComplete,
  onIssueOpen,
  onIssueClose,
}: SubTitleBtnsProps) => {
  return (
    <>
      {isEdit ? (
        <Button mode="primaryGhost" onClick={onCancel}>
          <Icon name="Close" color="primary" />
          편집취소
        </Button>
      ) : (
        <Button mode="primaryGhost" onClick={onEditClick}>
          <Icon name="Edit" color="primary" />
          제목편집
        </Button>
      )}
      {!isEdit &&
        (isOpened ? (
          <Button mode="primaryGhost" onClick={onIssueClose}>
            <Icon name="CloseIssue" color="primary" />
            이슈닫기
          </Button>
        ) : (
          <Button mode="primaryGhost" onClick={onIssueOpen}>
            <Icon name="OpenIssue" color="primary" />
            이슈열기
          </Button>
        ))}
      {isEdit && (
        <Button type="submit" mode="primary" onClick={onEditComplete}>
          <Icon name="Edit" color="white" />
          편집완료
        </Button>
      )}
    </>
  );
};

export default SubTitleBtns;

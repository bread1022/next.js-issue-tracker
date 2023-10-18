import Button from '@/components/Common/Button';
import Icon from '@/components/ui/Icon';
import {
  useIssueFilterDispatch,
  useIssueFilterState,
} from '@/context/IssueFilterContext';

export interface IssueCountType {
  openCount: number;
  closeCount: number;
}

const TableStatusBtns = ({ openCount, closeCount }: IssueCountType) => {
  const { isOpen } = useIssueFilterState();
  const { onFilterOpen, onFilterClose } = useIssueFilterDispatch();

  const handleOpenClick = () => {
    if (isOpen) return;
    onFilterOpen();
  };

  const handleCloseClick = () => {
    if (isOpen === false) return;
    onFilterClose();
  };

  return (
    <div className="flex">
      <Button mode="ghost" size="max" onClick={handleOpenClick}>
        <Icon name="OpenIssue" color="textDark" />
        <p className={`${isOpen && 'font-semibold'}`}>
          열린 이슈 ({openCount})
        </p>
      </Button>
      <Button mode="ghost" size="max" onClick={handleCloseClick}>
        <Icon name="CloseIssue" />
        <p className={`${isOpen === false && 'font-semibold'}`}>
          닫힌 이슈 ({closeCount})
        </p>
      </Button>
    </div>
  );
};

export default TableStatusBtns;

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

  const handleOpenIssueClick = () => {
    if (isOpen) return;
    onFilterOpen();
  };

  const handleCloseIssueClick = () => {
    if (isOpen === false) return;
    onFilterClose();
  };

  return (
    <div className="flex">
      <Button mode="ghost" size="max" onClick={handleOpenIssueClick}>
        <Icon name="OpenIssue" color="textDark" />
        <span className={`${isOpen && 'font-semibold'} hidden web:inline`}>
          열린 이슈
        </span>
        <span> ({openCount})</span>
      </Button>
      <Button mode="ghost" size="max" onClick={handleCloseIssueClick}>
        <Icon name="CloseIssue" />
        <span
          className={`${isOpen === false && 'font-semibold'} hidden web:inline`}
        >
          닫힌 이슈
        </span>
        <span> ({closeCount})</span>
      </Button>
    </div>
  );
};

export default TableStatusBtns;

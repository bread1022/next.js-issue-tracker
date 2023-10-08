import Button from '@/components/Common/Button';
import Icon from '@/components/ui/Icon';

interface TableStatusBtnsProps {
  isOpen: boolean;
  onClick: (type: 'open' | 'close') => void;
}

const TableStatusBtns = ({ isOpen, onClick }: TableStatusBtnsProps) => {
  // const { openCount, closeCount } = getIssuesCount();
  const { openCount, closeCount } = { openCount: 1, closeCount: 2 };
  const handleOpenClick = () => !isOpen && onClick('open');
  const handleCloseClick = () => isOpen && onClick('close');

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
        <p className={`${!isOpen && 'font-semibold'}`}>
          닫힌 이슈 ({closeCount})
        </p>
      </Button>
    </div>
  );
};

export default TableStatusBtns;

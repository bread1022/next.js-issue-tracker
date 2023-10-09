import Button from '@/components/Common/Button';
import Icon from '@/components/ui/Icon';

interface TableStatusBtnsProps {
  isOpen: boolean;
  onClick: (type: 'open' | 'close') => void;
}

const TableStatusBtns = ({ isOpen, onClick }: TableStatusBtnsProps) => {
  // const { openCount, closeCount } = countInfo();
  // TODO: count정보를 프로받기에는 드릴링이 있음. serveice로 분리해야할듯
  const { openCount, closeCount } = { openCount: 0, closeCount: 0 };

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

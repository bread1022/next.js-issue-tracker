import CheckBox from '@/components/Common/CheckBox';
import TableSelectMenu from './TableSelectMenu/TableSelectMenu';
import TableStatusBtns from './TableStatusBtns';
import { useState } from 'react';
import StatusSelectMenu from './StatusSelectMenu/StatusSelectMenu';

interface TableHeaderProps {
  isOpen: boolean;
  selectedItem: string[];
  onStatusBtnClick: (type: 'open' | 'close') => void;
  onSelectedOption: (item: string) => void;
}

const TableHeader = ({
  isOpen,
  onStatusBtnClick,
  selectedItem,
  onSelectedOption,
}: TableHeaderProps) => {
  const [checked, setChecked] = useState(false);

  const handleAllCheck = () => console.log('체크박스 전체 체크');

  const checkedCount = 0;

  const handleSelectStatus = (item: string) => console.log(item);

  return (
    <div className="h-16 grid grid-cols-[40px_1fr_auto] border-b border-border">
      <CheckBox id={'all'} checked={checked} onClick={handleAllCheck} />
      {checkedCount > 0 ? (
        <StatusSelectMenu
          checkedCount={checkedCount}
          onSelectStatus={handleSelectStatus}
        />
      ) : (
        <>
          <TableStatusBtns isOpen={isOpen} onClick={onStatusBtnClick} />
          <TableSelectMenu
            selectedItem={selectedItem}
            onClick={onSelectedOption}
          />
        </>
      )}
    </div>
  );
};

export default TableHeader;

import TableSelectMenu from './TableSelectMenu/TableSelectMenu';
import TableStatusBtns from './TableStatusBtns';

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
  return (
    <div className="flex justify-between">
      <TableStatusBtns isOpen={isOpen} onClick={onStatusBtnClick} />
      <TableSelectMenu selectedItem={selectedItem} onClick={onSelectedOption} />
    </div>
  );
};

export default TableHeader;

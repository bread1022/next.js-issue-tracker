'use client';

import CheckBox from '@/components/Common/CheckBox';
import TableSelectMenu from './TableSelectMenu/TableSelectMenu';
import TableStatusBtns, { IssueCountType } from './TableStatusBtns';
import {
  useIssueCheckDispatch,
  useIssueCheckState,
} from '@/context/IssueCheckContext';
import SwitchStatusMenu from './StatusSelectMenu/SwitchStatusMenu';
import {
  useIssueFilterDispatch,
  useIssueFilterState,
} from '@/context/IssueFilterContext';
import useIssueList from '@/hook/issueList';

interface TableHeaderProps {
  issueCount: IssueCountType;
}

const TableHeader = ({ issueCount }: TableHeaderProps) => {
  const filterState = useIssueFilterState();
  const { putIsOpenOfIssue } = useIssueList();
  const { onFilterOpen, onFilterClose } = useIssueFilterDispatch();
  const { checkedAll, checkeditems } = useIssueCheckState();
  const { onCheckAll, onUncheckAll } = useIssueCheckDispatch();
  const isChecked = checkeditems.length > 0;

  const handleCheckBoxClick = () => {
    if (checkedAll || isChecked) onUncheckAll();
    else onCheckAll();
  };

  const handleSelectStatusItem = (item: string) => {
    const updateStatus = item === 'open';
    if (filterState.isOpen === updateStatus) return;

    putIsOpenOfIssue(checkeditems, updateStatus)
      .then(() => {
        if (item === 'open') onFilterOpen();
        else onFilterClose();
      })
      .finally(() => onUncheckAll());
  };

  return (
    <div className="h-16 pr-5 grid grid-cols-[40px_3fr_minmax(300px,_1fr)] items-center border-b border-border">
      <CheckBox id={'all'} checked={isChecked} onClick={handleCheckBoxClick} />
      {isChecked ? (
        <SwitchStatusMenu
          checkedCount={checkeditems.length}
          onSelect={handleSelectStatusItem}
        />
      ) : (
        <>
          <TableStatusBtns {...issueCount} />
          <TableSelectMenu />
        </>
      )}
    </div>
  );
};

export default TableHeader;

'use client';

import CheckBox from '@/components/Common/CheckBox';
import TableSelectMenu from './TableSelectMenu/TableSelectMenu';
import TableStatusBtns, { IssueCountType } from './TableStatusBtns';
import {
  useIssueCheckDispatch,
  useIssueCheckState,
} from '@/context/IssueCheckContext';
import SwitchStatusMenu from './StatusSelectMenu';

interface TableHeaderProps {
  issueCount: IssueCountType;
}

const TableHeader = ({ issueCount }: TableHeaderProps) => {
  const { checkedAll, checkeditems } = useIssueCheckState();
  const { onCheckAll, onUncheckAll, onSwitchCheck } = useIssueCheckDispatch();
  const isChecked = checkeditems.length > 0;

  const handleCheckBoxClick = () => {
    if (checkedAll) onUncheckAll();
    else onCheckAll();
  };

  const handleSelectStatusItem = (item: string) => {
    // TODO: 상태 변경 PATCH (checkeditems)의 상태를 스위치
    if (item === 'open') {
      console.log('open으로 변경');
    } else console.log('close로 변경');
    onSwitchCheck();
  };

  return (
    <div className="h-16 grid grid-cols-[40px_3fr_1fr] items-center border-b border-border">
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

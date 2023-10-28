'use client';

import CheckBox from '@/components/Common/CheckBox';
import TableSelectMenu from './TableSelectMenu/TableSelectMenu';
import TableStatusBtns, { IssueCountType } from './TableStatusBtns';
import {
  useIssueCheckDispatch,
  useIssueCheckState,
} from '@/context/IssueCheckContext';
import SwitchStatusMenu from './StatusSelectMenu';
import axios from 'axios';
import { useIssueFilterState } from '@/context/IssueFilterContext';

interface TableHeaderProps {
  issueCount: IssueCountType;
}

const TableHeader = ({ issueCount }: TableHeaderProps) => {
  const filterState = useIssueFilterState();
  const { checkedAll, checkeditems } = useIssueCheckState();
  const { onCheckAll, onUncheckAll, onSwitchCheck } = useIssueCheckDispatch();
  const isChecked = checkeditems.length > 0;

  const handleCheckBoxClick = () => {
    if (checkedAll || isChecked) onUncheckAll();
    else onCheckAll();
  };

  // TODO: 이슈리스트 revalidate 아니면 optimistic ui
  const handleSelectStatusItem = (item: string) => {
    if (item === 'open') {
      if (filterState.isOpen) return;
      axios.put('/api/issues', {
        isOpen: true,
        issues: checkeditems,
      });
    } else {
      if (!filterState.isOpen) return;
      axios.put('/api/issues', {
        isOpen: false,
        issues: checkeditems,
      });
    }
    onSwitchCheck();
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

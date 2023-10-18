'use client';

import CheckBox from '@/components/Common/CheckBox';
import TableSelectMenu from './TableSelectMenu/TableSelectMenu';
import TableStatusBtns, { IssueCountType } from './TableStatusBtns';
import { memo, useState } from 'react';
import StatusSelectMenu from './StatusSelectMenu/StatusSelectMenu';

interface TableHeaderProps {
  issueCount: IssueCountType;
}

const TableHeader = ({ issueCount }: TableHeaderProps) => {
  const [checked, setChecked] = useState(false);

  const handleAllCheck = () => console.log('체크박스 전체 체크');

  const checkedCount = 0;

  const handleSelectStatus = (item: string) => console.log(item);

  return (
    <div className="h-16 grid grid-cols-[40px_3fr_1fr] border-b border-border">
      <CheckBox id={'all'} checked={checked} onClick={handleAllCheck} />
      {checkedCount > 0 ? (
        <StatusSelectMenu
          checkedCount={checkedCount}
          onSelectStatus={handleSelectStatus}
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

export default memo(TableHeader);

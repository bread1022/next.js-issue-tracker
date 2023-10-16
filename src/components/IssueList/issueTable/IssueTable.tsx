'use client';

import useSWR from 'swr';
import { IssueType } from '@/app/model/issue';
import { useState } from 'react';
import TableHeader from './TableHeader';
import IssueItem from './IssueItem/IssueItem';
import Skeletone from '@/components/Common/Skeletone';
import IssueEmptyItem from './IssueItem/IssueEmptyItem';

// TODO: checkBox 상태관리는 여기서
const IssueTable = () => {
  const { data: issues, isLoading } = useSWR<IssueType[]>('/api/issues');

  const [openStatus, setOpenStatus] = useState(true);
  const handleStatusBtn = (type: 'open' | 'close') => {
    if (type === 'open') setOpenStatus(true);
    else setOpenStatus(false);
  };

  const [checkState, setCheckState] = useState(false);
  const handleCheck = () => console.log('아이템 체크');

  //TODO: 항목별로 따로 관리해야되지!!!
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const handleSelectOption = (item: string) => {
    if (selectedItem.includes(item)) {
      setSelectedItem((prev) => prev.filter((prevItem) => prevItem !== item));
    } else {
      setSelectedItem((prev) => [...prev, item]);
    }
  };

  // TODO: 페이지 네이션 !!!
  return (
    <div className="rounded-lg border border-border">
      <TableHeader
        isOpen={openStatus}
        onStatusBtnClick={handleStatusBtn}
        selectedItem={selectedItem}
        onSelectedOption={handleSelectOption}
      />
      <ul>
        {isLoading ? (
          <Skeletone type="list" />
        ) : !!issues?.length ? (
          issues &&
          issues.map((issue) => (
            <IssueItem
              key={issue.id}
              item={issue}
              checked={checkState}
              onCheck={handleCheck}
            />
          ))
        ) : (
          <IssueEmptyItem />
        )}
      </ul>
    </div>
  );
};

export default IssueTable;

'use client';

import useSWR from 'swr';
import IssueItem from './IssueItem';
import { IssueType } from '@/app/model/issue';
import { useState } from 'react';
import TableHeader from '../TableHeader';

// TODO: checkBox 상태관리는 여기서
export default function TableList() {
  const { data: issues, isLoading } = useSWR<IssueType[]>('/api/issues');

  const [openStatus, setOpenStatus] = useState(true);
  const handleStatusBtn = (type: 'open' | 'close') => {
    if (type === 'open') setOpenStatus(true);
    else setOpenStatus(false);
  };

  const [checkState, setCheckState] = useState(false);
  const handleCheck = () => console.log('아이템 체크');

  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const handleSelectOption = (item: string) => {
    if (selectedItem.includes(item)) {
      setSelectedItem((prev) => prev.filter((prevItem) => prevItem !== item));
    } else {
      setSelectedItem((prev) => [...prev, item]);
    }
  };

  return (
    <>
      <TableHeader
        isOpen={openStatus}
        onStatusBtnClick={handleStatusBtn}
        selectedItem={selectedItem}
        onSelectedOption={handleSelectOption}
      />
      <ul>
        {isLoading ? (
          <p>로딩중</p>
        ) : (
          issues &&
          issues.map((issue) => (
            <IssueItem
              key={issue.id}
              item={issue}
              checked={checkState}
              onCheck={handleCheck}
            />
          ))
        )}
      </ul>
    </>
  );
}

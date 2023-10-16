'use client';

import SideBar from '@/components/New/SideBar';
import { SideBarItem } from '@/components/New/SideBar';
import { useState } from 'react';

interface DetailSideBarProps {
  id: string;
}

const DetailSideBar = ({ id }: DetailSideBarProps) => {
  // TODO: id에 해당하는 issue의 assignees, labels GET가져오고, 선택사항이 변경되면 PATCH
  const [assignees, setAssignees] = useState<SideBarItem[]>([]);
  const [labels, setLabels] = useState<SideBarItem[]>([]);

  //TODO: 아이템클릭시, 해당 value에 해당 MenuItem POST (새이슈작성과 중복됨)
  const handleSelectItems = (value: string, item: SideBarItem) => {
    if (value === 'assignees') {
      const isExist = assignees.find(
        (assignee) => assignee.menuItem === item.menuItem,
      );
      if (isExist) {
        setAssignees(
          assignees.filter((assignee) => assignee.menuItem !== item.menuItem),
        );
      } else {
        setAssignees([...assignees, item]);
      }
    } else if (value === 'labels') {
      const isExist = labels.find((label) => label.menuItem === item.menuItem);
      if (isExist) {
        setLabels(labels.filter((label) => label.menuItem !== item.menuItem));
      } else {
        setLabels([...labels, item]);
      }
    }
  };

  return (
    <SideBar
      assignees={assignees}
      labels={labels}
      onSelect={handleSelectItems}
    />
  );
};

export default DetailSideBar;

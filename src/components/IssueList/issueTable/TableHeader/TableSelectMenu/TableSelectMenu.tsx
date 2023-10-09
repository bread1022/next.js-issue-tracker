'use client';

import Dropdown from '@/components/Common/Dropdown';
import Avatar from '@/components/Common/Avatar';
import { useState } from 'react';
import fetcher from '@/lib/fetcher';
import { ISSUE_SELECT_MENU } from './constant';

interface TableSelectMenuProps {
  selectedItem: string[];
  onClick: (title: string) => void;
}

const TableSelectMenu = ({ selectedItem, onClick }: TableSelectMenuProps) => {
  const [items, setItems] = useState([]);
  //TODO: fetcher 함수 이렇게 써도 되는 건지 확인
  const handleSelectMenuBtnClick = (endpoint: string) => {
    fetcher(endpoint).then(setItems);
  };

  const handleSelectItemClick = (item: string) => onClick(item);

  return (
    <div className="w-64 grid grid-cols-3">
      {ISSUE_SELECT_MENU.map(({ label, menuTitle, endpoint }) => (
        <Dropdown
          key={label}
          label={label}
          menuTitle={menuTitle}
          onClick={() => handleSelectMenuBtnClick(endpoint)}
        >
          {items.map(
            ({ id, userId, userImage, labelName, backgroundColor }) => (
              <Dropdown.Item
                key={id}
                item={userId || labelName}
                value={id}
                selectedItem={selectedItem}
                onSelect={handleSelectItemClick}
              >
                <Avatar
                  src={userImage}
                  alt={userId}
                  backgroundColor={backgroundColor}
                  size="sm"
                />
              </Dropdown.Item>
            ),
          )}
        </Dropdown>
      ))}
    </div>
  );
};

export default TableSelectMenu;

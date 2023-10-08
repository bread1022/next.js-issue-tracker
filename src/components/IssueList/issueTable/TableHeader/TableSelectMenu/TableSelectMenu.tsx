'use client';

import Dropdown from '@/components/Common/Dropdown';
import Avatar from '@/components/Common/Avatar';
import { useState } from 'react';
import { ISSUE_SELECT_MENU } from './constants';
import fetcher from '@/lib/fetcher';

interface TableSelectMenuProps {
  selectedItem: string[];
  onClick: (title: string) => void;
}

const TableSelectMenu = ({ selectedItem, onClick }: TableSelectMenuProps) => {
  const [items, setItems] = useState([]);

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

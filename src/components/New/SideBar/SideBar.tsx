import { MenuItemValue, SIDEBAR_SELECT_MENU } from './constant';
import { useState } from 'react';
import useSWR from 'swr';
import SideBarDropdown, { SideBarItem } from './SideBarDropdown';
import { User } from '@/app/model/user';
import { Label } from '@/app/model/label';

interface SideBarProps {
  assignees: SideBarItem[];
  labels: SideBarItem[];
  onSelect: (menu: MenuItemValue, item: SideBarItem) => void;
}

const SideBar = ({ assignees, labels, onSelect }: SideBarProps) => {
  const [endpoint, setEndpoint] = useState('user');
  const { data: items } = useSWR(`/api/${endpoint}`);

  const handleMenuBtnClick = (endpoint: string) => setEndpoint(endpoint);

  const handleSelectItemClick = (menu: MenuItemValue, item: SideBarItem) => {
    onSelect(menu, item);
  };

  const convertSideBarItem = (value: MenuItemValue) => {
    if (!items) return;
    switch (value) {
      case 'assignees':
        return items.map((item: User) => ({
          menuIcon: item.userImage,
          menuItem: item.userId,
          selected: assignees.some((user) => user.menuItem === item.userId),
        }));
      case 'labels':
        return items.map((item: Label) => ({
          menuIcon: item.backgroundColor,
          menuItem: item.labelName,
          menuColor: item.fontColor,
          selected: labels.some((label) => label.menuItem === item.labelName),
        }));
    }
  };

  return (
    <div className="w-[274px] h-max min-h-[381px] p-7 bg-neutralWeak border border-border rounded-lg">
      {SIDEBAR_SELECT_MENU.map(({ label, value, endpoint }) => (
        <SideBarDropdown
          key={label}
          label={label}
          value={value}
          assignees={assignees}
          labels={labels}
          items={convertSideBarItem(value)}
          onBtnClick={() => handleMenuBtnClick(endpoint)}
          onSelect={handleSelectItemClick}
        />
      ))}
    </div>
  );
};

export default SideBar;

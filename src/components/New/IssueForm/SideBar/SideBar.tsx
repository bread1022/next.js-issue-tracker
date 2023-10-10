import fetcher from '@/lib/fetcher';
import { SIDEBAR_SELECT_MENU } from './constant';
import { useState } from 'react';
import Dropdown from '@/components/Common/Dropdown';
import Avatar from '@/components/Common/Avatar';
import Skeletone from '@/components/Common/Skeletone';
import LabelTag from '@/components/Common/LabelTag';
import SelectedUserItem from './SelectedUsers';
import SelectedUsers from './SelectedUsers';
import SelectedLabels from './SelectedLabels';

// TODO: 아이템 정보 객체로 저장해야될 것같음
interface SideBarProps {
  selectedItem: string[];
  onSelect: (item: string) => void;
}

const SideBar = ({ selectedItem, onSelect }: SideBarProps) => {
  const [items, setItems] = useState([]);

  const handleSelectMenuBtnClick = (endpoint: string) => {
    fetcher(endpoint).then(setItems);
  };

  const [selectedItems, setSelectedItems] = useState({
    assignees: [],
    labels: [],
  });

  const handleSelectItemClick = (value: string) => {
    onSelect(value);
    // TODO: label, assignee 구분해서 선택된 아이템 저장해야됨
  };

  return (
    <div className="w-full px-8 py-7 bg-neutralWeak border border-border rounded-lg">
      {SIDEBAR_SELECT_MENU.map(({ label, value, endpoint }) => (
        <>
          <Dropdown
            key={label}
            label={label}
            size="lg"
            onClick={() => handleSelectMenuBtnClick(endpoint)}
          >
            {items.length > 0 ? (
              items.map(
                ({ id, userId, userImage, labelName, backgroundColor }) => (
                  <Dropdown.Item
                    key={id}
                    item={userId || labelName}
                    value={id}
                    selectedItem={selectedItem}
                    onSelect={handleSelectItemClick}
                  >
                    <Avatar
                      key={userId}
                      src={userImage}
                      alt={userId}
                      backgroundColor={backgroundColor}
                      size="sm"
                    />
                  </Dropdown.Item>
                ),
              )
            ) : (
              <Skeletone type="menuItem" />
            )}
          </Dropdown>
        </>
      ))}
    </div>
  );
};

export default SideBar;

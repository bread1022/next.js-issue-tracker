import Dropdown from '@/components/Common/Dropdown';
import Avatar from '@/components/Common/Avatar';
import { useState } from 'react';
import { ISSUE_SELECT_MENU } from './constant';
import Skeleton from '@/components/Common/Skeleton';
import useSWR from 'swr';
import {
  useIssueFilterDispatch,
  useIssueFilterState,
} from '@/context/IssueFilterContext';
import { getSelectedMenuItems } from '@/service/filter';
import { User } from '@/model/user';
import { Label } from '@/model/label';

interface TableSelectMenuItemProps {
  item: string;
  userImage?: string;
  backgroundColor?: string;
}

const TableSelectMenu = () => {
  const [endpoint, setEndpoint] = useState('user');
  const { data: item, isLoading } = useSWR(`/api/${endpoint}`);

  const filterState = useIssueFilterState();
  const { onFilterByAuthor, onFilterByLabels, onFilterByAssignee } =
    useIssueFilterDispatch();

  const formatMenuItems = (endpoint: string) => {
    if (!item) return;
    switch (endpoint) {
      case 'user':
        return item.map(({ userId, userImage }: User) => ({
          item: userId,
          userImage: userImage,
        }));
      case 'label':
        return item.map(({ labelName, backgroundColor }: Label) => ({
          item: labelName,
          backgroundColor: backgroundColor,
        }));
      default: {
        throw new Error('Invalid menu item value');
      }
    }
  };

  const items = formatMenuItems(endpoint);

  const handleMenuBtnClick = (endpoint: string) => setEndpoint(endpoint);

  const handleItemClick = (value: string, item: string) => {
    const filterAction: Record<string, (item: string) => void> = {
      author: onFilterByAuthor,
      labels: onFilterByLabels,
      assignee: onFilterByAssignee,
    };
    return filterAction[value](item);
  };

  return (
    <div className="w-full grid grid-cols-3 web:gap-10">
      {ISSUE_SELECT_MENU.map(({ label, value, menuTitle, endpoint }) => (
        <Dropdown
          key={label}
          label={label}
          menuTitle={menuTitle}
          onClick={() => handleMenuBtnClick(endpoint)}
        >
          {isLoading ? (
            <Skeleton type="menuItem" />
          ) : (
            items?.length === 0 && (
              <Dropdown.Empty>항목이 없습니다.</Dropdown.Empty>
            )
          )}
          {items?.length > 0 &&
            items.map(
              ({
                item,
                userImage,
                backgroundColor,
              }: TableSelectMenuItemProps) => (
                <Dropdown.Item
                  key={item}
                  value={value}
                  item={item}
                  isSelected={getSelectedMenuItems(filterState, value, item)}
                  onSelect={handleItemClick}
                >
                  <Avatar
                    src={userImage}
                    alt={item}
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

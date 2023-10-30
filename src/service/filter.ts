import { Label } from '@/app/model/label';
import { User } from '@/app/model/user';
import { SelectMenuItemValue } from '@/components/IssueList/TableHeader/TableSelectMenu/constant';
import { SideBarItem } from '@/components/New/SideBar';
import { FilterState } from '@/context/IssueFilterContext';

export type FilterType =
  | 'open'
  | 'close'
  | 'author'
  | 'assignee'
  | 'comment'
  | 'labels';

export type FilterTypeWithoutLabels = Exclude<FilterType, 'labels'>;

export const getPlaceholder = (state: FilterState) => {
  const { isOpen, author, labels, assignee, comment } = state;
  const items = [
    isOpen ? 'is:open' : isOpen === false ? 'is:close' : 'all',
    author ? `author:${author}` : '',
    ...labels.map((label) => `label:${label}`),
    assignee ? `assignee:${assignee}` : '',
    comment ? `comment:${comment}` : '',
  ];
  return `is: issue ${items.filter((item) => item).join(' ')}`;
};

export const createQuery = (state: FilterState) => {
  const { isOpen, author, labels, assignee, comment } = state;
  const items = [
    isOpen ? 'isOpen=true' : isOpen === false ? 'isOpen=false' : 'isOpen=all',
    author ? `author=${author}` : '',
    labels.length > 0 ? `labels=${labels.join(',')}` : '',
    assignee ? `assignee=${assignee}` : '',
    comment ? `comment=${comment}` : '',
  ];
  return items.filter((item) => item).join('&');
};

export const checkSelectedItem = (
  state: FilterState,
  value: FilterTypeWithoutLabels,
) => {
  const { isOpen, author, assignee, comment } = state;
  const filterMap: Record<FilterTypeWithoutLabels, () => boolean> = {
    open: () => isOpen === true,
    close: () => isOpen === false,
    author: () => author === 'me',
    assignee: () => assignee === 'me',
    comment: () => comment === 'me',
  };
  return filterMap[value]();
};

export const getSelectedMenuItems = (
  state: FilterState,
  value: SelectMenuItemValue,
  item: string,
) => {
  const { author, labels, assignee } = state;
  const menuMap: Record<SelectMenuItemValue, () => boolean> = {
    author: () => author === item,
    assignee: () => assignee === item,
    labels: () => labels.includes(item),
  };
  return menuMap[value]();
};

export const convertToMenuItem = (
  value: 'assignees' | 'labels',
  items: User[] | Label[],
) => {
  if (!items) return [];

  const convertUser = (item: User) => ({
    id: item.id,
    menuIcon: item.userImage || 'default-image',
    menuItem: item.userId,
    selected: true,
  });
  const convertLabel = (item: Label) => ({
    id: item.id,
    menuIcon: item.backgroundColor,
    menuItem: item.labelName,
    menuColor: item.fontColor,
    selected: true,
  });

  const conversions = {
    assignees: (items as User[]).map(convertUser),
    labels: (items as Label[]).map(convertLabel),
  };
  return conversions[value] || [];
};

export const convertFromSideBarItem = (value: string, items: SideBarItem[]) => {
  switch (value) {
    case 'assignees':
      return items.map((item) => ({
        id: item.id,
        userId: item.menuItem,
        userImage: item.menuIcon,
      }));
    case 'labels':
      return items.map((item) => ({
        id: item.id,
        labelName: item.menuItem,
        backgroundColor: item.menuIcon,
        fontColor: item.menuColor,
      }));
    default:
      return [];
  }
};

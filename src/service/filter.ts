import { Label } from '@/app/model/label';
import { User } from '@/app/model/user';
import { SelectMenuItemValue } from '@/components/IssueList/IssueTable/TableHeader/TableSelectMenu/constant';
import { FilterState } from '@/context/IssueFilterContext';

export type FilterType =
  | 'open'
  | 'close'
  | 'author'
  | 'assignee'
  | 'comment'
  | 'labels';

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

export const isFilterSet = (state: FilterState) => {
  const { isOpen, author, labels, assignee, comment } = state;
  return (
    isOpen &&
    author === null &&
    labels.length === 0 &&
    assignee === null &&
    comment === null
  );
};

export const getSelectedFilterBarItem = (
  state: FilterState,
  value: Exclude<FilterType, 'labels'>,
) => {
  const { isOpen, author, assignee, comment } = state;
  const filterMap: Record<Exclude<FilterType, 'labels'>, () => boolean> = {
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
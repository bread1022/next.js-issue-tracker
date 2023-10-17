import { FilterState } from '@/context/IssueFilterContext';

export type FilterType = 'open' | 'close' | 'author' | 'assignee' | 'comment';

export const getPlaceholder = (state: FilterState) => {
  const { isOpen, author, labels, assignee, comment } = state;
  const filters = [
    isOpen ? 'is:open' : isOpen === false ? 'is:close' : '',
    author ? `author:${author}` : '',
    ...labels.map((label) => `label:${label}`),
    assignee ? `assignee:${assignee}` : '',
    comment ? `comment:${comment}` : '',
  ];
  return `is: issue ${filters.filter((filter) => filter).join(' ')}`;
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

export const getSelectedFilterBarItem = (state: FilterState, value: FilterType) => {
  const { isOpen, author, assignee, comment } = state;
  const filterMap: Record<FilterType, () => boolean> = {
    open: () => isOpen === true,
    close: () => isOpen === false,
    author: () => author === 'me',
    assignee: () => assignee === 'me',
    comment: () => comment === 'me',
  };
  return filterMap[value]();
};

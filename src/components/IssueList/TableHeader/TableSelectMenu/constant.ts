export type SelectMenuItem = {
  label: string;
  value: 'assignee' | 'labels' | 'author';
  menuTitle: string;
  endpoint: string;
};

export type SelectMenuItemValue = SelectMenuItem['value'];

export const ISSUE_SELECT_MENU: SelectMenuItem[] = [
  {
    label: '담당자',
    value: 'assignee',
    menuTitle: '담당자 필터',
    endpoint: 'user',
  },
  {
    label: '레이블',
    value: 'labels',
    menuTitle: '레이블 필터',
    endpoint: 'label',
  },
  {
    label: '작성자',
    value: 'author',
    menuTitle: '작성자 필터',
    endpoint: 'user',
  },
];

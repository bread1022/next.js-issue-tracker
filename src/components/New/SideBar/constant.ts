export type SidebarMenuItem = {
  label: string;
  value: 'assignees' | 'labels';
  endpoint: string;
};

export type MenuItemValue = SidebarMenuItem['value'];

export const SIDEBAR_SELECT_MENU: SidebarMenuItem[] = [
  {
    label: '담당자',
    value: 'assignees',
    endpoint: 'user',
  },
  {
    label: '레이블',
    value: 'labels',
    endpoint: 'label',
  },
];

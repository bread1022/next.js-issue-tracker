import { FilterTypeWithoutLabels } from '@/service/filter';

interface FilterBarMenu {
  label: string;
  menuTitle: string;
  items: {
    label: string;
    value: FilterTypeWithoutLabels;
  }[];
}

export const FILTERBAR_MENU: FilterBarMenu[] = [
  {
    label: '필터',
    menuTitle: '이슈 필터',
    items: [
      {
        label: '열린이슈',
        value: 'open',
      },
      {
        label: '내가 작성한 이슈',
        value: 'author',
      },
      {
        label: '나에게 할당된 이슈',
        value: 'assignee',
      },
      {
        label: '내가 댓글을 남긴 이슈',
        value: 'comment',
      },
      {
        label: '닫힌 이슈',
        value: 'close',
      },
    ],
  },
];

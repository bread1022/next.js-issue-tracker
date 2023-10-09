export const FILTERBAR_MENU = [
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
        value: 'authorByMe',
      },
      {
        label: '나에게 할당된 이슈',
        value: 'assigneeByMe',
      },
      {
        label: '내가 댓글을 남긴 이슈',
        value: 'commentByMe',
      },
      {
        label: '닫힌 이슈',
        value: 'close',
      },
    ],
  },
];

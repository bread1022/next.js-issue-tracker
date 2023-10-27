import type { Meta, StoryObj } from '@storybook/react';
import Comment from './Comment';

const meta: Meta<typeof Comment> = {
  title: 'Detail/Comment',
  component: Comment,
  decorators: [
    (Story) => (
      <div className="w-3/6">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {};

export const CommentByMe: Story = {
  ...Template,
  args: {
    comments: {
      authorId: 'xeesoxee',
      authorImage:
        'https://image.ajunews.com/content/image/2023/04/27/20230427170222403012.jpg',
      comment: '화이팅',
      createdAt: '2023-10-01T14:48:00.000Z',
      isMine: true,
      commentId: '1',
    },
  },
};

export const CommentDefault: Story = {
  ...Template,
  args: {
    comments: {
      authorId: 'bogummy',
      authorImage:
        'https://img.sportsworldi.com/content/image/2023/04/11/20230411524403.jpg',
      comment: '화이팅!!!',
      createdAt: '2023-10-02T14:48:00.000Z',
      updatedAt: '2023-10-11T14:48:00.000Z',
      isMine: false,
      commentId: '2',
    },
  },
};

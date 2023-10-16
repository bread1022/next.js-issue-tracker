import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';

const meta = {
  title: 'Common/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    id: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    half: { control: 'boolean' },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CommentDefault: Story = {
  args: {
    id: 'default',
    placeholder: '코맨트를 작성하세요 - 새이슈페이지',
    value: '',
    half: false,
  },
};

export const Comment: Story = {
  args: {
    id: 'Comment',
    placeholder: '코맨트를 작성하세요 - 새이슈페이지',
    value: '코맨트를 작성하면 여기에 표시됩니다',
    half: false,
  },
};

export const Half: Story = {
  args: {
    id: 'comments',
    placeholder: '코맨트를 작성하세요 - 이슈 상세 페이지',
    value: '',
    half: true,
  },
};

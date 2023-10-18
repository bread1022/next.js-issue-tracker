import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Common/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleDefault: Story = {
  args: {
    id: 'title',
    placeholder: '제목',
    value: '',
  },
};

export const Title: Story = {
  args: {
    id: 'title',
    placeholder: '제목',
    value: '제목이 있으면 여기에 표시됩니다',
  },
};

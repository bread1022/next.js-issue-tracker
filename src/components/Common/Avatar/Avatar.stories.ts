import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta = {
  title: 'Common/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SmallAvatar: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/1229560?v=4',
    alt: 'Avatar',
    size: 'sm',
  },
};

export const LargeAvatar: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/1229560?v=4',
    alt: 'Avatar',
    size: 'lg',
  },
};

export const ColorAvatar: Story = {
  args: {
    alt: 'ColorAvatar',
    size: 'sm',
    backgroundColor: '#5050FF',
  },
};

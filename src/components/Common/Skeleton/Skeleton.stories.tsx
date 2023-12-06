import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Common/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const List: Story = {
  args: {
    type: 'list',
  },
};

export const Text: Story = {
  args: {
    type: 'text',
    size: 'md',
  },
};

export const Avatar: Story = {
  args: {
    type: 'avatar',
    size: 'md',
  },
};

export const MenuItem: Story = {
  args: {
    type: 'menuItem',
  },
};

export const Title: Story = {
  args: {
    type: 'title',
  },
};

export const SideBar: Story = {
  args: {
    type: 'sideBar',
  },
};

export const Comment: Story = {
  args: {
    type: 'comment',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta = {
  title: 'Common/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: { control: 'text' },
    size: { control: 'number' },
    color: { control: 'text' },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FileIcon: Story = {
  args: {
    name: 'Clip',
    size: 20,
    color: 'textDark',
  },
};

export const TrashIcon: Story = {
  args: {
    name: 'Trash',
    color: 'red',
  },
};

export const GitHubIcon: Story = {
  args: {
    name: 'GitHub',
    size: 32,
  },
};

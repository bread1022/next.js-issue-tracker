import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'max'] },
    mode: {
      control: 'radio',
      options: ['default', 'primary', 'ghost', 'primaryGhost', 'black'],
    },
    active: { control: 'boolean' },
    justify: { control: 'radio', options: ['center', 'between'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GhostBtn: Story = {
  args: {
    size: 'sm',
    mode: 'ghost',
    active: true,
    justify: 'center',
    children: 'Button',
  },
};

export const primaryBtn: Story = {
  args: {
    size: 'md',
    mode: 'primary',
    active: true,
    justify: 'center',
    children: 'Button',
  },
};

export const defaultBtn: Story = {
  args: {
    size: 'md',
    mode: 'default',
    active: true,
    justify: 'center',
    children: 'Button',
  },
};

export const PrimaryGhostBtn: Story = {
  args: {
    size: 'md',
    mode: 'primaryGhost',
    active: true,
    justify: 'center',
    children: 'Button',
  },
};

export const GitHubBtn: Story = {
  args: {
    size: 'max',
    mode: 'black',
    active: true,
    justify: 'center',
    children: 'GitHub으로 이동',
    //TODO: 아이콘 컴포넌트 조합하는 방법
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import Icon from '@/components/ui/Icon';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <Button {...args}>
      <Icon name="GitHub" color="white" />
      {args.children}
    </Button>
  ),
};

export const GhostBtn: Story = {
  args: {
    size: 'sm',
    mode: 'ghost',
    active: true,
    justify: 'center',
    children: 'Button',
  },
};

export const PrimaryBtn: Story = {
  args: {
    size: 'md',
    mode: 'primary',
    active: true,
    justify: 'center',
    children: 'Button',
  },
};

export const DefaultBtn: Story = {
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
  ...Template,
  args: {
    size: 'lg',
    mode: 'black',
    active: true,
    justify: 'center',
    children: 'GitHub 계정으로 로그인',
  },
};

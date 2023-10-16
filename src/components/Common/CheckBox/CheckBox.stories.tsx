import type { Meta, StoryObj } from '@storybook/react';
import CheckBox from './CheckBox';

const meta = {
  title: 'Common/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    id: {
      control: 'radio',
      options: ['all', 1, 2, 3, 4, 5],
    },
    checked: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllChecked: Story = {
  args: {
    id: 'all',
    checked: true,
  },
};

export const CheckedDefault: Story = {
  args: {
    id: 1,
    checked: true,
  },
};

export const UnChecked: Story = {
  args: {
    id: 1,
    checked: false,
  },
};

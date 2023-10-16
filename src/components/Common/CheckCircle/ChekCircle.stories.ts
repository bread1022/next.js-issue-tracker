import type { Meta, StoryObj } from '@storybook/react';
import CheckCircle from './CheckCircle';

const meta = {
  title: 'Common/CheckCircle',
  component: CheckCircle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof CheckCircle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckedCircle: Story = {
  args: {
    checked: true,
  },
};

export const UncheckedCircle: Story = {
  args: {
    checked: false,
  },
};

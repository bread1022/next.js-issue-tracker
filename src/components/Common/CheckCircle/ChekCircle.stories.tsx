import type { Meta, StoryObj } from '@storybook/react';
import CheckCircle from './CheckCircle';

const meta: Meta<typeof CheckCircle> = {
  title: 'Common/CheckCircle',
  component: CheckCircle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

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

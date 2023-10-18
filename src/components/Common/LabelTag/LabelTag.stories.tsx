import type { Meta, StoryObj } from '@storybook/react';
import LabelTag from './LabelTag';

const meta: Meta<typeof LabelTag> = {
  title: 'Common/LabelTag',
  component: LabelTag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const White: Story = {
  args: {
    labelName: 'label1',
    backgroundColor: '#20B2AA',
    fontColor: 'white',
  },
};

export const Black: Story = {
  args: {
    labelName: 'label2',
    backgroundColor: '#FFD228',
    fontColor: 'black',
  },
};

export const LongName: Story = {
  args: {
    labelName: 'label3333333333333333333333333333333333333',
    backgroundColor: '#FF7A85',
    fontColor: 'black',
  },
};

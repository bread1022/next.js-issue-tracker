import type { Meta, StoryObj } from '@storybook/react';
import IssueForm from './IssueForm';

const meta: Meta<typeof IssueForm> = {
  title: 'New/IssueForm',
  component: IssueForm,
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <div className="w-11/12 grid grid-cols-[80px_minmax(450px,_1fr)_auto] gap-3">
      <IssueForm {...args} />
    </div>
  ),
};

export const IssueFormDefault: Story = {
  ...Template,
  args: {},
};

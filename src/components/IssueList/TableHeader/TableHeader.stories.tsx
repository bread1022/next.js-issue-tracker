import type { Meta, StoryObj } from '@storybook/react';
import TableHeader from './TableHeader';

const meta: Meta<typeof TableHeader> = {
  title: 'IssueList/TableHeader',
  component: TableHeader,
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => <TableHeader {...args} />,
};

export const TableHeaderDefault: Story = {
  ...Template,
  args: {
    issueCount: {
      openCount: 10,
      closeCount: 7,
    },
  },
};

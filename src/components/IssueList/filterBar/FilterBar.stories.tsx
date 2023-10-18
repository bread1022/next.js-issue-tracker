import type { Meta, StoryObj } from '@storybook/react';
import FilterBar from '.';
import FilterResetBtn from './FilterResetBtn';

const meta: Meta<typeof FilterBar> = {
  title: 'IssueList/FilterBar',
  component: FilterBar,
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <div className="w-max h-24 flex flex-col justify-between gap-3">
      <FilterBar {...args} />
      <FilterResetBtn />
    </div>
  ),
};

export const FilterInputBar: Story = {
  ...Template,
  args: {
    filterstate: {},
    onSelect: () => {},
  },
};

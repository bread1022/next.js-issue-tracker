import type { Meta, StoryObj } from '@storybook/react';
import IssueForm from './IssueForm';
import Avatar from '@/components/Common/Avatar';

const meta: Meta<typeof IssueForm> = {
  title: 'New/IssueForm',
  component: IssueForm,
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <div className="grid grid-cols-[80px_minmax(450px,_1fr)_auto] gap-3">
      <Avatar
        src="https://image.ajunews.com/content/image/2023/04/27/20230427170222403012.jpg"
        alt="소희"
        size="lg"
      />
      <IssueForm {...args} />
    </div>
  ),
};

export const IssueFormDefault: Story = {
  ...Template,
  args: {},
};

import type { Meta, StoryObj } from '@storybook/react';
import TitleEditor from './TitleEditor';
import TitleEditBtns from './TitleEditBtns';

const meta: Meta<typeof TitleEditor> = {
  title: 'Detail/TitleEditor',
  component: TitleEditor,
  decorators: [
    (Story) => (
      <div className="w-full h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <div className="h-10 grid grid-cols-[1fr_auto_auto] gap-3">
      <TitleEditor {...args} />
      <TitleEditBtns
        isEdit={args.isEdit}
        isOpened
        active={args.title ? (args.title.length > 0 ? true : false) : false}
        onCancel={() => {}}
        onEdit={() => {}}
        onOpen={() => {}}
        onClose={() => {}}
        onSubmit={() => {}}
      />
    </div>
  ),
};

export const TitleEditorIsEdit: Story = {
  ...Template,
  args: {
    id: '8bf96857-7ea2-40bd-a838-a12475db19d6',
    isEdit: true,
    title: '편집 가능한 제목',
  },
};

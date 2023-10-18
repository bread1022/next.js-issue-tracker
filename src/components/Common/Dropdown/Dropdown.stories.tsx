import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';
import Avatar from '../Avatar';

const meta: Meta<typeof Dropdown> = {
  title: 'Common/Dropdown',
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => <Dropdown {...args} />,
};

export const FilterBarDropdown: Story = {
  ...Template,
  args: {
    size: 'sm',
    label: '필터',
    menuTitle: '이슈 필터',
    children: (
      <>
        <Dropdown.Item
          item="열린 이슈"
          value="open"
          isSelected
          hasIcon
          onSelect={() => {}}
        />
        <Dropdown.Item
          item="닫힌 이슈"
          value="close"
          isSelected={false}
          hasIcon
          onSelect={() => {}}
        />
      </>
    ),
  },
};

export const UserDropdown: Story = {
  ...Template,
  args: {
    size: 'sm',
    label: '담당자',
    menuTitle: '담당자 필터',
    children: (
      <>
        <Dropdown.Item
          item="xeesoxee"
          value="assignee"
          isSelected={false}
          hasIcon
          children={
            <Avatar
              src="https://image.ajunews.com/content/image/2023/04/27/20230427170222403012.jpg"
              alt="소희"
              size="sm"
            />
          }
          onSelect={() => {}}
        />
        <Dropdown.Item
          item="bogummy"
          value="assignee"
          isSelected
          hasIcon
          children={
            <Avatar
              src="https://img.sportsworldi.com/content/image/2023/04/11/20230411524403.jpg"
              alt="보검"
              size="sm"
            />
          }
          onSelect={() => {}}
        />
      </>
    ),
  },
};

export const LabelDropdown: Story = {
  ...Template,
  args: {
    size: 'sm',
    label: '레이블',
    menuTitle: '레이블 필터',
    children: (
      <>
        <Dropdown.Item
          item="bug"
          value="assignee"
          isSelected={false}
          hasIcon
          children={<Avatar alt="bug" size="sm" backgroundColor="#5050FF" />}
          onSelect={() => {}}
        />
        <Dropdown.Item
          item="feat"
          value="assignee"
          isSelected
          hasIcon
          children={<Avatar alt="feat" size="sm" backgroundColor="#FF5050" />}
          onSelect={() => {}}
        />
      </>
    ),
  },
};

export const SwitchStatusDropdown: Story = {
  ...Template,
  args: {
    size: 'sm',
    label: '상태 변경',
    menuTitle: '상태 변경',
    children: (
      <>
        <Dropdown.Item
          item="선택한 이슈 열기"
          value="open"
          isSelected
          hasIcon
          onSelect={() => {}}
        />
        <Dropdown.Item
          item="선택한 이슈 닫기"
          value="close"
          isSelected={false}
          hasIcon
          onSelect={() => {}}
        />
      </>
    ),
  },
};

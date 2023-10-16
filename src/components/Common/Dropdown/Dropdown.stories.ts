import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';

const meta = {
  title: 'Common/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'lg'] },
    label: { control: 'text' },
    children: {
      control: 'node',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

//TODO: 아이템 컴포넌트 합성하기
export const FilterDropdown: Story = {
  args: {
    size: 'sm',
    label: '필터바',
    children: '드롭다운',
  },
};

export const TableDropdown: Story = {
  args: {
    size: 'sm',
    label: '테이블 드롭다운',
    menuTitle: '드롭다운 메뉴',
    children: '드롭다운',
  },
};

export const SideBarDropdown: Story = {
  args: {
    size: 'sm',
    label: '사이드바 드롭다운',
    children: '드롭다운',
  },
};

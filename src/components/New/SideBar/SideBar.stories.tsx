import type { Meta, StoryObj } from '@storybook/react';
import SideBar from '.';

const meta: Meta<typeof SideBar> = {
  title: 'New/SideBar',
  component: SideBar,
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => <SideBar {...args} />,
};

export const SideBarDefault: Story = {
  ...Template,
  args: {
    assignees: [
      {
        id: '1',
        menuItem: 'xeesoxee',
        menuIcon:
          'https://image.ajunews.com/content/image/2023/04/27/20230427170222403012.jpg',
        selected: true,
      },
      {
        id: '1',
        menuItem: 'bogummy',
        menuIcon:
          'https://img.sportsworldi.com/content/image/2023/04/11/20230411524403.jpg',
        selected: true,
      },
    ],
    labels: [
      {
        id: '1',
        menuItem: 'bug',
        menuIcon: '#d25ab8c0',
        menuColor: 'white',
        selected: true,
      },
      {
        id: '1',
        menuIcon: '#eb9832',
        menuItem: 'feature',
        menuColor: 'black',
        selected: true,
      },
      {
        id: '1',
        menuIcon: '#64CD3C',
        menuItem: 'docs',
        menuColor: 'white',
        selected: true,
      },
      {
        id: '1',
        menuIcon: '#1892d356',
        menuItem: 'request',
        menuColor: 'white',
        selected: true,
      },
      {
        id: '1',
        menuIcon: '#f9f92a',
        menuItem: 'refactor',
        menuColor: 'black',
        selected: true,
      },
    ],
  },
};

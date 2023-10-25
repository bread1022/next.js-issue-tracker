import SideBar from '@/components/New/SideBar';
import { SideBarItem } from '@/components/New/SideBar';
import { useCallback } from 'react';
import DeleteBtn from './DeleteBtn';
import { User } from '@/app/model/user';
import { Label } from '@/app/model/label';
import Skeletone from '@/components/Common/Skeletone';

interface DetailSideBarProps {
  isLoading?: boolean;
  assignees: User[];
  labels: Label[];
  isMine: boolean;
}

const DetailSideBar = ({
  isLoading,
  assignees,
  labels,
  isMine,
}: DetailSideBarProps) => {
  const getSideBarItem = useCallback(
    (value: string, items: User[] | Label[]) => {
      if (!items) return [];
      switch (value) {
        case 'assignees':
          return (items as User[]).map((item) => ({
            menuIcon: item.userImage || 'default이미지',
            menuItem: item.userId,
            selected: true,
          }));
        case 'labels':
          return (items as Label[]).map((item) => ({
            menuIcon: item.backgroundColor,
            menuItem: item.labelName,
            menuColor: item.fontColor,
            selected: true,
          }));
        default:
          return [];
      }
    },
    [],
  );

  const selectedAssignee = getSideBarItem('assignees', assignees);
  const selectedLabel = getSideBarItem('labels', labels);

  const handleSelectItems = (value: string, item: SideBarItem) => {
    // TODO: isMine이면, PATCH /api/issues/:id/:value, body: { [value]: [item.menuItem] }
    console.log('사이드바 옵션 변경');
  };

  const handleDeleteItem = () => {
    //TODO: isMine이면, DELETE /api/issues/:id
    console.log('이슈 삭제');
  };

  return (
    <>
      {isLoading ? (
        <Skeletone type="sideBar" />
      ) : (
        <div>
          <SideBar
            assignees={selectedAssignee}
            labels={selectedLabel}
            onSelect={handleSelectItems}
          />
          {isMine && <DeleteBtn onDelete={handleDeleteItem} />}
        </div>
      )}
    </>
  );
};

export default DetailSideBar;

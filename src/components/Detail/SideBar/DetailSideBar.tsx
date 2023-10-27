import SideBar from '@/components/New/SideBar';
import { SideBarItem } from '@/components/New/SideBar';
import { useCallback, useState } from 'react';
import DeleteBtn from './DeleteBtn';
import { User } from '@/app/model/user';
import { Label } from '@/app/model/label';
import Skeletone from '@/components/Common/Skeletone';
import axios from 'axios';
import Alert from '@/components/Common/Alert';
import { AlertType } from '@/components/Common/Alert/Alert';

interface DetailSideBarProps {
  id: string;
  assignees: User[];
  labels: Label[];
  isMine: boolean;
  isLoading?: boolean;
}

const DetailSideBar = ({
  id,
  isLoading,
  assignees,
  labels,
  isMine,
}: DetailSideBarProps) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const getSideBarItem = useCallback(
    (value: string, items: User[] | Label[]) => {
      if (!items) return [];
      switch (value) {
        case 'assignees':
          return (items as User[]).map((item) => ({
            id: item.id,
            menuIcon: item.userImage || 'default이미지',
            menuItem: item.userId,
            selected: true,
          }));
        case 'labels':
          return (items as Label[]).map((item) => ({
            id: item.id,
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
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (!isMine) return;
    axios.delete(`/api/issues/${id}`);
    setIsAlertOpen(false);
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
          {isAlertOpen && (
            <Alert
              message="삭제하시겠습니까?"
              type={[
                {
                  value: AlertType.cancel,
                  onClick: () => setIsAlertOpen(false),
                },
                { value: AlertType.confirm, onClick: confirmDelete },
              ]}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DetailSideBar;

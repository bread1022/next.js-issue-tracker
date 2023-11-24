import SideBar from '@/components/New/SideBar';
import { SideBarItem } from '@/components/New/SideBar';
import { useState } from 'react';
import DeleteBtn from './DeleteBtn';
import { User } from '@/model/user';
import { Label } from '@/model/label';
import Skeletone from '@/components/Common/Skeletone';
import Alert from '@/components/Common/Alert';
import { AlertType } from '@/components/Common/Alert/Alert';
import { useRouter } from 'next/navigation';
import useIssueList from '@/hook/issueList';
import { convertToMenuItem } from '@/service/filter';

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
  const router = useRouter();
  const { deleteIssueBy } = useIssueList();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const selectedAssignee = convertToMenuItem('assignees', assignees);
  const selectedLabel = convertToMenuItem('labels', labels);

  const handleSelectItems = (value: string, item: SideBarItem) => {
    // TODO: isMine이면, PATCH /api/issues/:id/:value, body: { [value]: [item.menuItem] }
    console.log('사이드바 옵션 변경');
  };

  const handleDeleteItem = () => setIsAlertOpen(true);

  const confirmDelete = () => {
    if (!isMine) return;
    deleteIssueBy(id);
    setIsAlertOpen(false);
    router.push('/');
  };

  return (
    <>
      {isLoading ? (
        <Skeletone type="sideBar" />
      ) : (
        <div>
          <SideBar
            isMine={isMine}
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

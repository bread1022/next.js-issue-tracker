'use client';

import TextArea from '@/components/Common/TextArea';
import TextInput from '@/components/Common/TextInput';
import CancleBtn from '../CancleBtn';
import { ChangeEvent, useState } from 'react';
import SubmitBtn from '../SubmitBtn';
import SideBar from '../SideBar';
import { MenuItemValue } from '../SideBar/constant';
import { SideBarItem } from '../SideBar/SideBarDropdown';
import { useRouter } from 'next/navigation';
import useIssueList from '@/hook/issueList';
import { useSession } from 'next-auth/react';

const IssueForm = () => {
  const { refresh, replace } = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const { postIssue } = useIssueList();

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [assignees, setAssignees] = useState<SideBarItem[]>([]);
  const [labels, setLabels] = useState<SideBarItem[]>([]);
  const isSubmitReady = title.length > 0 && comment.length > 0;

  const handleSelectMenuItem = (
    value: MenuItemValue,
    selectedItem: SideBarItem,
  ) => {
    const findAndSetItems = (
      items: SideBarItem[],
      targetItem: SideBarItem,
      setItems: (items: SideBarItem[]) => void,
    ) => {
      const { menuItem } = targetItem;
      const isExist = items.some((item) => item.menuItem === menuItem);
      if (isExist) {
        const newItems = items.filter((item) => item.menuItem !== menuItem);
        setItems(newItems);
      } else setItems([...items, targetItem]);
    };

    if (value === 'assignees') {
      findAndSetItems(assignees, selectedItem, setAssignees);
    } else if (value === 'labels') {
      findAndSetItems(labels, selectedItem, setLabels);
    }
  };

  const handleFormReset = () => {
    setTitle('');
    setComment('');
    setAssignees([]);
    setLabels([]);
  };

  const handleFormSubmit = () => {
    postIssue({
      user: {
        userId: user.userId,
        userImage: user.userImage,
      },
      title,
      comment,
      assignees,
      labels,
    });
    handleFormReset();
    refresh();
    replace('/');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setComment(e.target.value);

  return (
    <>
      <form id="new-issue-form" className="w-full flex flex-col gap-2">
        <TextInput
          id="title"
          placeholder="제목"
          value={title}
          onChange={handleInputChange}
        />
        <TextArea
          id="contents"
          placeholder="코멘트를 입력하세요"
          value={comment}
          onChange={handleTextAreaChange}
        />
      </form>
      <SideBar
        isMine
        assignees={assignees}
        labels={labels}
        onSelect={handleSelectMenuItem}
      />
      <CancleBtn onClick={handleFormReset} />
      <SubmitBtn active={isSubmitReady} onClick={handleFormSubmit} />
    </>
  );
};

export default IssueForm;

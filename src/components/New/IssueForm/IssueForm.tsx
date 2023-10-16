'use client';

import TextArea from '@/components/Common/TextArea';
import TextInput from '@/components/Common/TextInput';
import CancleBtn from '../CancleBtn';
import { ChangeEvent, useState } from 'react';
import SubmitBtn from '../SubmitBtn';
import SideBar from '../SideBar';
import { MenuItemValue } from '../SideBar/constant';
import { SideBarItem } from '../SideBar/SideBarDropdown';

const IssueForm = () => {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [assignees, setAssignees] = useState<SideBarItem[]>([]);
  const [labels, setLabels] = useState<SideBarItem[]>([]);

  const isSubmitReady = title.length > 0 && comment.length > 0;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setComment(e.target.value);

  //TODO: 아이템클릭시, 해당 value에 해당 MenuItem POST
  const handleSelectMenuItem = (value: MenuItemValue, item: SideBarItem) => {
    if (value === 'assignees') {
      const isExist = assignees.find(
        (assignee) => assignee.menuItem === item.menuItem,
      );
      if (isExist) {
        setAssignees(
          assignees.filter((assignee) => assignee.menuItem !== item.menuItem),
        );
      } else {
        setAssignees([...assignees, item]);
      }
    } else if (value === 'labels') {
      const isExist = labels.find((label) => label.menuItem === item.menuItem);
      if (isExist) {
        setLabels(labels.filter((label) => label.menuItem !== item.menuItem));
      } else {
        setLabels([...labels, item]);
      }
    }
  };

  const handleFormReset = () => {
    setTitle('');
    setComment('');
  };

  const handleFormSubmit = () => {
    // TODO: POST /api/issues - 해당 id 이슈로 이동
    console.log('완료', title, comment);
  };

  return (
    <>
      <form className="w-full flex flex-col gap-2">
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

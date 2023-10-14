'use client';

import StatusLabel from '@/components/Detail/StatusLabel';
import getElapsedTime from '@/utils/date';
import { memo, useRef, useState } from 'react';
import TitleEditor from './TitleEditor';
import SubTitleBtns from './SubTitleBtns';

interface SubTitleProps {
  id: string;
  title: string;
  isOpen: boolean;
  createdAt: string;
  authorId: string;
  commentsCount: number;
  isMine: boolean;
}

const SubTitle = ({
  id,
  title,
  isOpen,
  createdAt,
  authorId,
  commentsCount,
  isMine,
}: SubTitleProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentIsOpen, setCurrentIsOpen] = useState(isOpen);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => setIsEdit((prev) => !prev);

  const handleCancel = () => setIsEdit(false);

  const handleEditComplete = () => {
    // TODO: POST (/issues/:id, title)
    setIsEdit(false);
    const value = inputRef.current?.value;
    value && setValue(value);
  };

  const handleIssueOpen = () => {
    // TODO : POST (/issues/:id, isOpen = true)
    toggleIssue();
  };

  const handleIssueClose = () => {
    // TODO : POST (/issues/:id, isOpen = false)
    toggleIssue();
  };

  const toggleIssue = () => setCurrentIsOpen((prev) => !prev);

  return (
    <div className="h-full flex flex-col gap-3 mx-8 py-5 border-b border-border">
      <div className="h-10 grid grid-cols-[1fr_auto_auto] gap-3">
        <TitleEditor id={id} title={value} isEdit={isEdit} ref={inputRef} />
        {isMine && (
          <SubTitleBtns
            isEdit={isEdit}
            isOpened={currentIsOpen}
            onCancel={handleCancel}
            onEditClick={handleEditClick}
            onEditComplete={handleEditComplete}
            onIssueOpen={handleIssueOpen}
            onIssueClose={handleIssueClose}
          />
        )}
      </div>
      <div className="flex items-center gap-5">
        <StatusLabel isOpen={currentIsOpen} />
        <span>
          이 이슈가 {getElapsedTime(createdAt)}에 {authorId}님에 의해
          {`${currentIsOpen ? '열렸' : '닫혔'}`}습니다.
        </span>
        <span>코멘트 {commentsCount}개</span>
      </div>
    </div>
  );
};

export default memo(SubTitle);

'use client';

import { ChangeEvent, memo, useCallback, useState } from 'react';
import TitleEditor from './TitleEditor';
import TitleEditBtns from './TitleEditBtns';
import SubText from './SubText';

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
  const [editedValue, setEditedValue] = useState(title);

  const handleEdit = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setEditedValue(target.value);

  const handleEditClick = useCallback(() => setIsEdit((prev) => !prev), []);

  const handleCancel = () => {
    setEditedValue(value);
    setIsEdit(false);
  };

  const handleSubmit = () => {
    // TODO: POST (/issues/:id, title)
    setValue(editedValue);
    setIsEdit(false);
  };

  const handleIssueOpen = useCallback(() => {
    // TODO : POST (/issues/:id, isOpen = true)
    toggleIssue();
  }, []);

  const handleIssueClose = useCallback(() => {
    // TODO : POST (/issues/:id, isOpen = false)
    toggleIssue();
  }, []);

  const toggleIssue = () => setCurrentIsOpen((prev) => !prev);

  return (
    <div className="h-full flex flex-col gap-3 mx-8 py-5 border-b border-border">
      <div className="h-10 grid grid-cols-[1fr_auto_auto] gap-3">
        <TitleEditor
          isEdit={isEdit}
          id={id}
          title={editedValue}
          onChange={handleEdit}
        />
        {isMine && (
          <TitleEditBtns
            isEdit={isEdit}
            isOpened={currentIsOpen}
            active={editedValue.length > 0 && editedValue !== value}
            onCancel={handleCancel}
            onEdit={handleEditClick}
            onSubmit={handleSubmit}
            onOpen={handleIssueOpen}
            onClose={handleIssueClose}
          />
        )}
      </div>
      <SubText
        {...{ isOpen: currentIsOpen, createdAt, authorId, commentsCount }}
      />
    </div>
  );
};

export default memo(SubTitle);

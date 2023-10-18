'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import TitleEditor from './TitleEditor';
import TitleEditBtns from './TitleEditBtns';
import SubText from './SubText';
import useSWR from 'swr';
import Skeletone from '@/components/Common/Skeletone';

type SubTitle = {
  id: string;
  title: string;
  isOpen: boolean;
  createdAt: string;
  authorId: string;
  commentsCount: number;
  isMine: boolean;
};

interface SubTitleProps {
  id: string;
}

const SubTitle = ({ id }: SubTitleProps) => {
  const { data: issue, isLoading } = useSWR<SubTitle>(`/api/issues/${id}`);

  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(issue?.title);
  const [editedValue, setEditedValue] = useState(issue?.title);

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
    console.log('open');
  }, []);

  const handleIssueClose = useCallback(() => {
    // TODO : POST (/issues/:id, isOpen = false)
    console.log('close');
  }, []);

  return (
    <div className="h-full flex flex-col gap-3 py-5 border-b border-border">
      {isLoading && <Skeletone type="title" />}
      {!isLoading && issue && (
        <>
          <div className="h-10 grid grid-cols-[1fr_auto_auto] gap-3">
            <TitleEditor
              isEdit={isEdit}
              id={id}
              title={editedValue || issue.title}
              onChange={handleEdit}
            />
            {issue?.isMine && (
              <TitleEditBtns
                isEdit={isEdit}
                isOpened={issue?.isOpen}
                active={
                  !!editedValue &&
                  editedValue.length > 0 &&
                  editedValue !== value
                }
                onCancel={handleCancel}
                onEdit={handleEditClick}
                onSubmit={handleSubmit}
                onOpen={handleIssueOpen}
                onClose={handleIssueClose}
              />
            )}
          </div>
          <SubText
            isOpen={issue.isOpen}
            createdAt={issue?.createdAt}
            authorId={issue?.authorId}
            commentsCount={issue?.commentsCount}
          />
        </>
      )}
    </div>
  );
};

export default SubTitle;

import { ChangeEvent, useCallback, useState } from 'react';
import TitleEditor from './TitleEditor';
import TitleEditBtns from './TitleEditBtns';
import SubText from './SubText';
import useIssue from '@/hook/issue';

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
  issue: SubTitle;
}

const SubTitle = ({ issue }: SubTitleProps) => {
  const { id, title, isOpen, createdAt, authorId, commentsCount } = issue;
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(title);
  const [editedValue, setEditedValue] = useState(title);

  const { putTitle, putIsOpen } = useIssue(issue.id);

  const isSubmitReady =
    !!editedValue && editedValue.length > 0 && editedValue !== value;

  const handleEdit = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setEditedValue(target.value);

  const handleEditClick = useCallback(() => setIsEdit((prev) => !prev), []);

  const handleCancel = useCallback(() => {
    setEditedValue(value);
    setIsEdit(false);
  }, [value]);

  const handleTitleEdit = useCallback(() => {
    putTitle(editedValue);
    setValue(editedValue);
    setIsEdit(false);
  }, [editedValue]);

  const handleIssueOpen = useCallback(() => {
    if (isOpen) return;
    putIsOpen({ isOpen: true });
  }, []);

  const handleIssueClose = useCallback(() => {
    if (!isOpen) return;
    putIsOpen({ isOpen: false });
  }, []);

  return (
    <div className="h-full flex flex-col gap-3 px-2 py-5 border-b border-border">
      <div className="h-10 grid grid-cols-[1fr_auto_auto] gap-3">
        <TitleEditor
          isEdit={isEdit}
          id={id}
          title={editedValue}
          onChange={handleEdit}
        />
        {issue?.isMine && (
          <TitleEditBtns
            isEdit={isEdit}
            isOpened={isOpen}
            active={isSubmitReady}
            onCancel={handleCancel}
            onEdit={handleEditClick}
            onSubmit={handleTitleEdit}
            onOpen={handleIssueOpen}
            onClose={handleIssueClose}
          />
        )}
      </div>
      <SubText
        isOpen={isOpen}
        createdAt={createdAt}
        authorId={authorId}
        commentsCount={commentsCount}
      />
    </div>
  );
};

export default SubTitle;

import { ChangeEvent, useCallback, useState } from 'react';
import TitleEditor from './TitleEditor';
import TitleEditBtns from './TitleEditBtns';
import SubText from './SubText';

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

  const isSubmitReady =
    !!editedValue && editedValue.length > 0 && editedValue !== value;

  const handleEdit = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setEditedValue(target.value);

  const handleEditClick = useCallback(() => setIsEdit((prev) => !prev), []);

  const handleCancel = useCallback(() => {
    setEditedValue(value);
    setIsEdit(false);
  }, [value]);

  const handleSubmit = useCallback(() => {
    // TODO: POST (/issues/:id, title)
    setValue(editedValue);
    setIsEdit(false);
  }, [editedValue]);

  const handleIssueOpen = useCallback(() => {
    // TODO : POST (/issues/:id, isOpen = true)
    console.log('open');
  }, []);

  const handleIssueClose = useCallback(() => {
    // TODO : POST (/issues/:id, isOpen = false)
    console.log('close');
  }, []);

  return (
    <div className="h-full flex flex-col gap-3 px-2 py-5 border-b border-border">
      <div className="h-10 grid grid-cols-[1fr_auto_auto] gap-3">
        <TitleEditor
          isEdit={isEdit}
          id={id}
          title={editedValue || title}
          onChange={handleEdit}
        />
        {issue?.isMine && (
          <TitleEditBtns
            isEdit={isEdit}
            isOpened={isOpen}
            active={isSubmitReady}
            onCancel={handleCancel}
            onEdit={handleEditClick}
            onSubmit={handleSubmit}
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

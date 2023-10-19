import { CommentType } from '@/app/model/issue';
import { useState, ChangeEvent, useCallback } from 'react';
import CommentEditor from './CommentEditor';
import CommentHeader from './CommentHeader';
import EditBtns from './EditBtns';

//TODO 마크업 표시 기능, 현재 코멘트에 대한 내용 편집 PATCH 기능
const Comment = (props: CommentType) => {
  const { comment } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(comment);
  const [editedValue, setEditedValue] = useState(comment);

  const handleEdit = ({ target }: ChangeEvent<HTMLTextAreaElement>) =>
    setEditedValue(target.value);

  const handleCancel = () => {
    setEditedValue(value);
    setIsEdit(false);
  };

  const handleSubmit = () => {
    console.log('//TODO: PATCH /issues/:id/comments/:commentId', editedValue);
    setValue(editedValue);
    setIsEdit(false);
  };

  const handleEditBtnClick = useCallback(() => setIsEdit(true), []);
  const handleAddEmoji = useCallback(() => console.log('// TODO: 이모지'), []);

  return (
    <>
      <section className={getCommentStyle(isEdit)}>
        <CommentHeader
          {...props}
          onEditBtn={handleEditBtnClick}
          onEmojiBtn={handleAddEmoji}
        />
        <CommentEditor
          isEdit={isEdit}
          comment={editedValue}
          onChange={handleEdit}
        />
      </section>
      <EditBtns
        isEdit={isEdit}
        active={editedValue.length > 0 && editedValue !== value}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  );
};

const getCommentStyle = (isEdit: boolean) => {
  const defaultStyle = 'rounded-lg border';
  return `${defaultStyle} ${
    isEdit ? 'border-textLight' : 'border-border h-full'
  }`;
};

export default Comment;

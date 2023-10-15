'use client';

import useSWR from 'swr';
import { CommentType } from '@/app/model/issue';
import TextArea from '../../Common/TextArea';
import { ChangeEvent, useState } from 'react';
import Icon from '../../ui/Icon';
import Button from '../../Common/Button';
import Comment from './Comment';

interface CommentsContainerProps {
  id: string;
}

const CommentsContainer = ({ id }: CommentsContainerProps) => {
  const { data, error, isLoading } = useSWR(`/api/issues/${id}/comments`);
  const comments: CommentType[] = data?.comments;

  const [value, setValue] = useState('');

  const handleNewComment = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleNewCommentSubmit = () => {
    //TODO: POST (/issues/:id/comments, comment)
    console.log(value);
  };

  return (
    <div className="grid gap-4">
      <ul>
        {comments &&
          comments.map((comment) => (
            <li key={comment.comment} className="pb-4">
              <Comment {...comment} />
            </li>
          ))}
      </ul>
      <TextArea
        id="issue-comment"
        placeholder="코맨트를 입력하세요."
        value={value}
        onChange={handleNewComment}
      />
      <div className="justify-self-end">
        <Button
          active={value.length > 0}
          mode="primary"
          type="submit"
          onClick={handleNewCommentSubmit}
        >
          <Icon name="Plus" color="white" />
          코맨트 작성
        </Button>
      </div>
    </div>
  );
};

export default CommentsContainer;

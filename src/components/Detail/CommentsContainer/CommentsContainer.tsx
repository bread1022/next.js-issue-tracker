'use client';

import useSWR from 'swr';
import { CommentType } from '@/app/model/issue';
import TextArea from '../../Common/TextArea';
import { ChangeEvent, useState } from 'react';
import Comment from './Comment';
import SubmitCommentBtn from './SubmitCommentBtn';
import Skeletone from '@/components/Common/Skeletone';

interface CommentsContainerProps {
  id: string;
}

const CommentsContainer = ({ id }: CommentsContainerProps) => {
  const { data: comments, isLoading } = useSWR<CommentType[]>(
    `/api/issues/${id}/comments`,
  );

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
        {isLoading ? (
          <Skeletone type="comment" />
        ) : (
          comments &&
          comments.map((comment) => (
            <li key={comment.comment} className="pb-4">
              <Comment {...comment} />
            </li>
          ))
        )}
      </ul>
      <TextArea
        id="issue-comment"
        placeholder="코맨트를 입력하세요."
        value={value}
        onChange={handleNewComment}
      />
      <SubmitCommentBtn
        active={value.length > 0}
        onSubmit={handleNewCommentSubmit}
      />
    </div>
  );
};

export default CommentsContainer;

import TextArea from '../../Common/TextArea';
import { ChangeEvent, useState } from 'react';

import SubmitCommentBtn from './SubmitCommentBtn';
import { CommentType } from '@/app/model/issue';
import Skeletone from '@/components/Common/Skeletone';
import Comment from './Comment';

interface CommentProps {
  isLoading?: boolean;
  comments: CommentType[];
}

const CommentsArea = ({ isLoading, comments }: CommentProps) => {
  const [value, setValue] = useState('');

  const handleNewComment = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleNewCommentSubmit = () => {
    //TODO: POST (/issues/:id/comments, comment)
    console.log(value);
  };

  return (
    <ul className="grid gap-4">
      {isLoading ? (
        <Skeletone type="comment" />
      ) : (
        comments.map((comment: CommentType) => (
          <li key={comment.comment}>
            <Comment {...comment} />
          </li>
        ))
      )}
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
    </ul>
  );
};

export default CommentsArea;

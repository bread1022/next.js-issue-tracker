import TextArea from '../../Common/TextArea';
import { ChangeEvent, useState } from 'react';

import SubmitCommentBtn from './SubmitCommentBtn';
import { CommentType } from '@/app/model/issue';
import Skeletone from '@/components/Common/Skeletone';
import Comment from './Comment';
import useIssue from '@/hook/issue';
import { useSession } from 'next-auth/react';

interface CommentProps {
  id: string;
  comments: CommentType[];
  isLoading?: boolean;
}

const CommentsArea = ({ id, comments, isLoading }: CommentProps) => {
  const [value, setValue] = useState('');

  const { data: user } = useSession();
  const authorId = user?.user.userId;
  const authorImage = user?.user.userImage;

  const { postComment } = useIssue(id);

  const handleNewComment = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleNewCommentSubmit = () => {
    postComment({
      authorId,
      authorImage,
      comment: value,
    });
    setValue('');
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

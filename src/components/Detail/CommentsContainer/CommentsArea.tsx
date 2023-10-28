import TextArea from '../../Common/TextArea';
import { ChangeEvent, useCallback, useState } from 'react';

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

  const { putNewComment, putEditComment } = useIssue(id);

  const handleNewComment = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleNewCommentSubmit = () => {
    putNewComment(value);
    setValue('');
  };

  const handleEditComment = useCallback(
    (commentId: string, comment: string) => {
      putEditComment(commentId, comment);
    },
    [putEditComment, authorId, authorImage],
  );

  return (
    <ul className="grid gap-4">
      {isLoading ? (
        <Skeletone type="comment" />
      ) : (
        comments.map((comment: CommentType) => (
          <li key={comment.createdAt}>
            <Comment comments={comment} onSubmit={handleEditComment} />
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

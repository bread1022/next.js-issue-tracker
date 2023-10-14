'use client';

import useSWR from 'swr';
import { CommentType } from '@/app/model/issue';
import TextArea from '../../Common/TextArea';
import { ChangeEvent, useState } from 'react';
import Icon from '../../ui/Icon';
import Button from '../../Common/Button';
import Comment from './Comment';

interface CommentsAreaProps {
  id: string;
}

const CommentsArea = ({ id }: CommentsAreaProps) => {
  //?? 댓글 목록 가져오고, POST 하면 데이터 즉각 바뀌니까 SWR로 하는게 좋을 것같다.
  const { data, error, isLoading } = useSWR(`/api/issues/${id}/comments`);
  const CommentsArea: CommentType[] = data?.CommentsArea;

  const [value, setValue] = useState('');

  const handleNewComment = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleNewCommentSubmit = () => {
    //TODO: POST (/issues/:id/comments, comment)
    console.log(value);
  };

  return (
    <div className="grid gap-4">
      <div>
        <Comment
          authorId="authorId"
          authorImage="https://avatars.githubusercontent.com/u/107349637?v=4"
          comment="comment"
          createdAt="createdAt"
          isMine={true}
        />
      </div>
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

export default CommentsArea;

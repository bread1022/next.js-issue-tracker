import { memo } from 'react';
import Avatar from '../../Common/Avatar';
import Button from '../../Common/Button';
import Icon from '../../ui/Icon';
import getElapsedTime from '@/utils/date';

interface CommentHeaderProps {
  authorId: string;
  authorImage: string;
  createdAt: string;
  updatedAt?: string;
  isMine: boolean;
  onEditBtn: () => void;
  onEmojiBtn: () => void;
}

const CommentHeader = ({
  authorId,
  authorImage,
  createdAt,
  updatedAt,
  isMine,
  onEditBtn,
  onEmojiBtn,
}: CommentHeaderProps) => {
  return (
    <div className="h-16 flex justify-between items-center p-3 rounded-t-lg bg-neutralWeak border-b border-border">
      <div className="flex items-center gap-3">
        <Avatar src={authorImage} alt={authorId} />
        <span>{authorId}</span>
        <span className="text-textLight text-xs web:text-sm">
          {updatedAt
            ? `${getElapsedTime(updatedAt)} 수정`
            : getElapsedTime(createdAt)}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {isMine && (
          <>
            <div className="py-1 px-2 rounded-full border border-border text-[0.75rem]">
              작성자
            </div>
            <Button size="sm" mode="ghost" onClick={onEditBtn}>
              <Icon name="Edit" />
              편집
            </Button>
          </>
        )}
        <Button size="sm" mode="ghost" onClick={onEmojiBtn}>
          <Icon name="Smile" />
          반응
        </Button>
      </div>
    </div>
  );
};

export default memo(CommentHeader);

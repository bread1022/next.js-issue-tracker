import getElapsedTime from '@/utils/date';
import StatusLabel from './StatusLabel';
import { memo } from 'react';

interface SubTextProps {
  isOpen: boolean;
  createdAt: string;
  authorId: string;
  commentsCount: number;
}

const SubText = ({
  isOpen,
  createdAt,
  authorId,
  commentsCount,
}: SubTextProps) => {
  return (
    <div className="flex items-center gap-5">
      <StatusLabel isOpen={isOpen} />
      <span>
        이 이슈가 {getElapsedTime(createdAt)}에 {authorId}님에 의해
        {`${isOpen ? '열렸' : '닫혔'}`}습니다.
      </span>
      <span>코멘트 {commentsCount}개</span>
    </div>
  );
};

export default memo(SubText);

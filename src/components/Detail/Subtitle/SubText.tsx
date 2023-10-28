import getElapsedTime from '@/utils/date';
import StatusLabel from './StatusLabel';
import { memo } from 'react';

interface SubTextProps {
  isOpen: boolean;
  createdAt: string;
  updatedAt?: string;
  authorId: string;
  commentsCount: number;
}

const SubText = ({
  isOpen,
  createdAt,
  updatedAt,
  authorId,
  commentsCount,
}: SubTextProps) => {
  console.log(updatedAt);
  return (
    <div className="px-1 flex items-center gap-5">
      <StatusLabel isOpen={isOpen} />
      <span>
        이 이슈가 {`${getElapsedTime(updatedAt ? updatedAt : createdAt)}`}에
        {authorId}님에 의해
        {`${isOpen ? '열렸' : '닫혔'}`}습니다.
      </span>
      <span>코멘트 {commentsCount}개</span>
    </div>
  );
};

export default memo(SubText);

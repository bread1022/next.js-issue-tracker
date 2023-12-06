'use client';

import DetailSideBar from './SideBar/DetailSideBar';
import SubTitle from './Subtitle';
import { notFound } from 'next/navigation';
import Skeleton from '../Common/Skeleton';
import CommentsArea from './CommentsContainer/CommentsArea';
import useIssue from '@/hook/issue';

interface IssueDetailProps {
  id: string;
}

const IssueDetail = ({ id }: IssueDetailProps) => {
  const { data, isLoading, error } = useIssue(id);

  if (error) return notFound();

  return (
    <>
      {isLoading ? <Skeleton type="title" /> : <SubTitle issue={data} />}
      <div className="my-4 grid grid-cols-[1fr_auto] gap-4">
        <CommentsArea {...data} isLoading={isLoading} />
        <DetailSideBar {...data} isLoading={isLoading} />
      </div>
    </>
  );
};

export default IssueDetail;

'use client';

import useSWR from 'swr';
import DetailSideBar from './SideBar/DetailSideBar';
import SubTitle from './Subtitle';
import { notFound } from 'next/navigation';
import Skeletone from '../Common/Skeletone';
import CommentsArea from './CommentsContainer/CommentsArea';

interface IssueDetailProps {
  id: string;
}

const IssueDetail = ({ id }: IssueDetailProps) => {
  const { data, isLoading, error } = useSWR(`/api/issues/${id}`);

  if (error) return notFound();

  return (
    <>
      {isLoading ? <Skeletone type="title" /> : <SubTitle issue={data} />}
      <div className="my-4 grid grid-cols-[1fr_auto] gap-4">
        <CommentsArea comments={data?.comments} isLoading={isLoading} />
        <DetailSideBar {...data} isLoading={isLoading} />
      </div>
    </>
  );
};

export default IssueDetail;

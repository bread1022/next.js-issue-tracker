import useSWR from 'swr';
import CommentsContainer from './CommentsContainer';
import DetailSideBar from './SideBar/DetailSideBar';
import SubTitle from './Subtitle';
import { notFound } from 'next/navigation';

interface IssueDetailProps {
  id: string;
}

const IssueDetail = ({ id }: IssueDetailProps) => {
  const { data: issue, isLoading, error } = useSWR(`/api/issues/${id}`);

  if (error) return notFound();

  return (
    <>
      <SubTitle id={id} />
      <div className="my-4 grid grid-cols-[1fr_auto] gap-4">
        <CommentsContainer id={id} />
        <DetailSideBar id={id} />
      </div>
    </>
  );
};

export default IssueDetail;

import CommentsContainer from '@/components/Detail/CommentsContainer';
import DetailSideBar from '@/components/Detail/SideBar/DetailSideBar';
import SubTitle from '@/components/Detail/Subtitle';
import { getIssueById } from '@/service/issues';
import { getServerSession } from 'next-auth';

interface IssueDetailPageProps {
  params: {
    id: string;
  };
}

export default async function IssueDetailPage({
  params: { id },
}: IssueDetailPageProps) {
  const session = await getServerSession();
  const issue = await getIssueById({ id, username: session?.user.name });

  return (
    <section>
      <SubTitle {...issue} />
      <div className="my-4 mx-8 grid grid-cols-[1fr_auto] gap-4">
        <CommentsContainer id={id} />
        <DetailSideBar id={id} />
      </div>
    </section>
  );
}

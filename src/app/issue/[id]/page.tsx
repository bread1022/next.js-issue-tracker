import IssueDetail from '@/components/Detail/IssueDetail';
interface IssueDetailPageProps {
  params: {
    id: string;
  };
}

export default function IssueDetailPage({
  params: { id },
}: IssueDetailPageProps) {
  return (
    <>
      <IssueDetail id={id} />
    </>
  );
}

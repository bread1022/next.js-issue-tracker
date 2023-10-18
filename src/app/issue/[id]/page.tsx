import CommentsContainer from '@/components/Detail/CommentsContainer';
import DetailSideBar from '@/components/Detail/SideBar/DetailSideBar';
import SubTitle from '@/components/Detail/Subtitle';

interface IssueDetailPageProps {
  params: {
    id: string;
  };
}
//?? 페이지에서 데이터를 다 가져와서 렌더링해야할까, 각 컴포넌트에서 필요한 데이터만 골라서 렌더링해야할까
export default async function IssueDetailPage({
  params: { id },
}: IssueDetailPageProps) {
  return (
    <>
      <SubTitle id={id} />
      <div className="my-4 grid grid-cols-[1fr_auto] gap-4">
        <CommentsContainer id={id} />
        <DetailSideBar id={id} />
      </div>
    </>
  );
}

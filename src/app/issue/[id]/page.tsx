import CommentsContainer from '@/components/Detail/CommentsContainer';
import DetailSideBar from '@/components/Detail/SideBar/DetailSideBar';
import SubTitle from '@/components/Detail/Subtitle';

interface IssueDetailPageProps {
  params: {
    id: string;
  };
}

/**
** 정적데이터이지만 서버사이드를 할 수 없는 이유 : 요청할 때 헤더 정보로 유저의 정보 확인 과정이 필요함
*? 고민하는 이유1. 데이터 패치 후 프롭으로 내려주게 되면, 타이틀만 바꿔도 새로 데이터를 패치해올 것이다. = 요청 1번에 전체 리렌더링
*? 고민하는 이유2. 그럼 각 컴포넌트에서 렌더링하면 요청을 세번보내지만 - 타이틀만 변경해도 바로, 타이틀만 적용되고, 댓글은 그대로 있게 된다. = 요청 3번에 부분 리렌더링
* 우선 결론. SWR로 POST하는 방법을 추후에 더 공부해서 적용하는 것이 좋을 것같다.
 */

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

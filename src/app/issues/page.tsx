import FilterBar from '@/components/IssueList/FilterBar/FilterBar';
import IssueList from '@/components/IssueList/IssueList';
import LabelBtn from '@/components/IssueList/LinkBtns/LabelBtn';
import NewIssueBtn from '@/components/IssueList/LinkBtns/NewIssueBtn';
import { authOptions } from '@/lib/authOptions';
import { getIssueCount } from '@/service/issues';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function IssueListPage() {
  const session = await getServerSession(authOptions);
  const countInfo = await getIssueCount();

  if (!session) redirect('/');

  return (
    <>
      <div className="flex justify-between">
        <FilterBar />
        <div className="h-full flex gap-3">
          <LabelBtn count={countInfo.label} />
          <NewIssueBtn />
        </div>
      </div>
      <IssueList {...countInfo.issue} />
    </>
  );
}

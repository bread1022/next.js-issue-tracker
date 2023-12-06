import IssueFilterList from '@/components/IssueList/IssueFilterList';
import { getIssueCount } from '@/service/issues';
import { getUser } from '@/service/session';
import { redirect } from 'next/navigation';

export default async function IssueListPage() {
  const { user } = await getUser();
  if (!user) redirect('/auth/signin');
  const countInfo = await getIssueCount();

  return <IssueFilterList countInfo={countInfo} />;
}

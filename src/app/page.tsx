import IssueFilterList from '@/components/IssueList/IssueFilterList';
import { authOptions } from '@/lib/authOptions';
import { getIssueCount } from '@/service/issues';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function IssueListPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) redirect('/auth/signin');
  const countInfo = await getIssueCount();

  return <IssueFilterList countInfo={countInfo} />;
}

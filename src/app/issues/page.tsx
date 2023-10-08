import IssueList from '@/components/IssueList/Index';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function IssueListPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  return (
    <>
      <IssueList />
    </>
  );
}

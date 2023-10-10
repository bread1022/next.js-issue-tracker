import Avatar from '@/components/Common/Avatar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import IssueForm from '@/components/New/IssueForm/IssueForm';

export default async function NewPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');
  const user = session.user;

  return (
    <>
      <main className="grid grid-cols-[80px_minmax(650px,_1fr)_auto] gap-3">
        <Avatar src={user.userImage} alt={user.name} size="lg" />
        <IssueForm />
      </main>
    </>
  );
}

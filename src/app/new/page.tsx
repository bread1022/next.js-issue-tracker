import Avatar from '@/components/Common/Avatar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import NewIssueForm from '@/components/New';

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <Avatar src={user.userImage} alt={user.name} size="lg" />
      <NewIssueForm />
    </>
  );
}

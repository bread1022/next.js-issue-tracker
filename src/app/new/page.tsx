import Avatar from '@/components/Common/Avatar';
import NewIssueForm from '@/components/New';
import { getUser } from '@/service/session';

export default async function NewPage() {
  const { user } = await getUser();
  return (
    <>
      <Avatar src={user.userImage} alt={user.name} size="lg" />
      <NewIssueForm />
    </>
  );
}

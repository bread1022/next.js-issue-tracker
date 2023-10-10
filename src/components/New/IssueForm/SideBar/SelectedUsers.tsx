import Avatar from '@/components/Common/Avatar';

interface SelectedUsersProps {
  users: {
    userId: string;
    userImage: string;
  }[];
}

const SelectedUsers = ({ users }: SelectedUsersProps) => {
  return (
    <ul className="z-20 max-h-28">
      {users.map(({ userId, userImage }) => (
        <li key={userId} className="w-full flex gap-3 py-1">
          <Avatar src={userImage} alt={userId} size="sm" />
          <p className="grow text-sm">{userId}</p>
        </li>
      ))}
    </ul>
  );
};

export default SelectedUsers;

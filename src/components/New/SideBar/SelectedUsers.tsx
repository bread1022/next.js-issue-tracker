import Avatar from '@/components/Common/Avatar';
import { SideBarItem } from './SideBarDropdown';

interface SelectedUsersProps {
  users: SideBarItem[];
}

const SelectedUsers = ({ users }: SelectedUsersProps) => {
  return (
    <ul>
      {users.map(({ menuItem, menuIcon }) => (
        <li key={menuItem} className="w-full flex gap-3 py-1">
          <Avatar src={menuIcon} alt={menuItem} size="sm" />
          <p className="grow text-xs web:text-sm">{menuItem}</p>
        </li>
      ))}
    </ul>
  );
};

export default SelectedUsers;

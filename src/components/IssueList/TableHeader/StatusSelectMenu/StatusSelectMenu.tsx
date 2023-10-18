import Dropdown from '@/components/Common/Dropdown';
import { ISSUE_STATUS_MENU } from './constant';

interface StatusSelectMenuProps {
  checkedCount: number;
  onSelectStatus: (item: string) => void;
}

const StatusSelectMenu = ({
  checkedCount,
  onSelectStatus,
}: StatusSelectMenuProps) => {
  return (
    <>
      <p>{checkedCount} 개 이슈 선택</p>
      {ISSUE_STATUS_MENU.map(({ label, menuTitle, items }) => (
        <Dropdown key={label} label={label} menuTitle={menuTitle}>
          {items.map((item) => (
            <Dropdown.Item
              key={item.label}
              item={item.label}
              value={item.value}
              hasIcon={false}
              onSelect={onSelectStatus}
            />
          ))}
        </Dropdown>
      ))}
    </>
  );
};

export default StatusSelectMenu;

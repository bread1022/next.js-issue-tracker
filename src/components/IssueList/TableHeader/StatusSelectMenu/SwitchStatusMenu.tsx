import Dropdown from '@/components/Common/Dropdown';
import { ISSUE_STATUS_MENU } from './constant';

interface SwitchStatusMenuProps {
  checkedCount: number;
  onSelect: (item: string) => void;
}

const SwitchStatusMenu = ({
  checkedCount,
  onSelect,
}: SwitchStatusMenuProps) => {
  return (
    <>
      <p className="px-3 text-sm text-semibold">{checkedCount} 개 이슈 선택</p>
      <div>
        {ISSUE_STATUS_MENU.map(({ label, menuTitle, items }) => (
          <Dropdown key={label} label={label} menuTitle={menuTitle}>
            {items.map((item) => (
              <Dropdown.Item
                key={item.label}
                item={item.label}
                value={item.value}
                hasIcon={false}
                onSelect={onSelect}
              />
            ))}
          </Dropdown>
        ))}
      </div>
    </>
  );
};

export default SwitchStatusMenu;

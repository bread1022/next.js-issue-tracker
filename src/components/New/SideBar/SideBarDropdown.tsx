import { MenuItemValue } from './constant';
import { useRef, useState } from 'react';
import Dropdown from '@/components/Common/Dropdown';
import Skeletone from '@/components/Common/Skeletone';
import useModalOutside from '@/hook/useClickOutside';
import useCalculateMenuPosition from '@/hook/useCalculateMenuPosition';
import SelectedUsers from './SelectedUsers';
import SelectedLabels from './SelectedLabels';

export interface SideBarItem {
  id: string;
  menuIcon: string;
  menuItem: string;
  menuColor?: string;
  selected: boolean;
}

interface SideBarDropdownProps {
  label: string;
  value: MenuItemValue;
  items?: SideBarItem[];
  assignees: SideBarItem[];
  labels: SideBarItem[];
  onBtnClick?: () => void;
  onSelect: (menu: MenuItemValue, item: SideBarItem) => void;
}

const SideBarDropdown = ({
  label,
  value,
  items,
  assignees,
  labels,
  onBtnClick,
  onSelect,
}: SideBarDropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuBtnClick = () => {
    if (!onBtnClick) return;
    onBtnClick();
    handleMenuToggle();
  };

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const handleMenuClose = () => setIsMenuOpen(false);

  const containerRef = useModalOutside({ onClose: handleMenuClose });
  const menuRef = useRef<HTMLDivElement>(null);
  const menuPosition = useCalculateMenuPosition({
    container: containerRef,
    menu: menuRef,
    isOpen: isMenuOpen,
  });

  const handleSideBarItemSelect = (menu: MenuItemValue, item: SideBarItem) => {
    onSelect(menu, item);
  };

  return (
    <div ref={containerRef} className="w-full">
      <Dropdown.Button label={label} onClick={handleMenuBtnClick} />
      {isMenuOpen && (
        <Dropdown.Menu ref={menuRef} style={menuPosition}>
          {items ? (
            <ul>
              {items.map((item, index) => (
                <Dropdown.SidebarItem
                  key={index}
                  value={value}
                  {...item}
                  onSelect={() => handleSideBarItemSelect(value, item)}
                />
              ))}
            </ul>
          ) : (
            <Skeletone type="menuItem" />
          )}
        </Dropdown.Menu>
      )}
      <div className="h-[81px] overflow-y-auto">
        {value === 'assignees'
          ? assignees && <SelectedUsers users={assignees} />
          : labels && <SelectedLabels labels={labels} />}
      </div>
    </div>
  );
};

export default SideBarDropdown;

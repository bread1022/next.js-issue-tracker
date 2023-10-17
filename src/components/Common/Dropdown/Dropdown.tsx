import { HTMLAttributes, ReactNode, forwardRef, useRef, useState } from 'react';
import CheckCircle from '../CheckCircle';
import Button from '../Button';
import Icon from '../../ui/Icon';
import useModalOutside from '@/hook/useClickOutside';
import useCalculateMenuPosition from '@/hook/useCalculateMenuPosition';
import Avatar from '../Avatar';
import { MenuItemValue } from '../../New/SideBar/constant';
import { SideBarItem } from '../../New/SideBar';

interface DropdownMenuBtnProps {
  size?: 'sm' | 'lg';
  label: string;
  onClick?: () => void;
  children?: ReactNode;
}

interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface DropdownProps extends DropdownMenuBtnProps {
  menuTitle?: string;
}

interface DropdownItemProps {
  item: string;
  value: string;
  isSelected?: boolean;
  hasIcon?: boolean;
  onSelect: (value: string) => void;
  children?: ReactNode;
}

interface DropdownSidebarItemProps extends SideBarItem {
  value: MenuItemValue;
  onSelect: (value: MenuItemValue, item: string) => void;
}

const Dropdown = ({
  label,
  menuTitle,
  size = 'sm',
  onClick,
  children,
}: DropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuBtnClick = () => {
    onClick && onClick();
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

  return (
    <div ref={containerRef} className="relative h-[inherit]">
      <Dropdown.Button size={size} label={label} onClick={handleMenuBtnClick} />
      {isMenuOpen && (
        <Dropdown.Menu ref={menuRef} style={menuPosition}>
          {menuTitle && <Dropdown.Header>{menuTitle}</Dropdown.Header>}
          <ul className={`${!menuTitle && 'rounded-t-lg overflow-hidden'}`}>
            {children}
          </ul>
        </Dropdown.Menu>
      )}
    </div>
  );
};

Dropdown.Button = ({ size = 'lg', label, onClick }: DropdownMenuBtnProps) => {
  return (
    <div className={`${getDropdownSize(size)}`}>
      <Button
        onClick={onClick}
        mode="ghost"
        justify={getButtonIconJustify(size)}
        size="lg"
      >
        {label}
        <Icon name="ArrowDown" color="text" />
      </Button>
    </div>
  );
};

Dropdown.Menu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ children, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        {...rest}
        className="absolute z-10 w-60 rounded-lg bg-neutralWeak border border-border text-sm overflow-hidden"
      >
        {children}
      </section>
    );
  },
);

Dropdown.Header = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="h-[40px] px-5 leading-10 rounded-t-lg bg-neutral border-b border-b-border">
      {children}
    </h1>
  );
};

Dropdown.Item = ({
  item,
  value,
  isSelected = false,
  hasIcon = true,
  onSelect,
  children,
}: DropdownItemProps) => {
  const isDefault = children === undefined;

  const handleSelect = () => onSelect(value);

  return (
    <li
      className={getItemStyle(hasIcon, isSelected, isDefault)}
      onClick={handleSelect}
    >
      {children}
      <span className="grow">{item}</span>
      {hasIcon && <CheckCircle checked={isSelected} />}
    </li>
  );
};

Dropdown.SidebarItem = ({
  value,
  menuIcon,
  menuItem,
  menuColor,
  selected,
  onSelect,
}: DropdownSidebarItemProps) => {
  return (
    <li
      className={getItemStyle(true, selected, false)}
      onClick={() => onSelect(value, menuItem)}
    >
      <Avatar
        key={menuItem}
        src={menuColor ? undefined : menuIcon}
        alt={menuItem}
        backgroundColor={menuColor && menuIcon}
        size="sm"
      />
      <span className="grow">{menuItem}</span>
      <CheckCircle checked={selected} />
    </li>
  );
};

export const getDropdownSize = (size: 'sm' | 'lg') => {
  const dropdownSizes = {
    sm: 'h-full w-20',
    lg: 'h-16 w-52',
  };
  return dropdownSizes[size];
};

export const getButtonIconJustify = (size: 'sm' | 'lg') => {
  return size === 'sm' ? 'center' : 'between';
};

const getItemStyle = (
  hasIcon: boolean,
  isSelected: boolean,
  isDefault: boolean,
) => {
  const itemDefaultStyle =
    'h-[45px] px-5 items-center border-b border-b-border last:border-b-0 last:rounded-b-lg hover:bg-white cursor-pointer';
  const itemFlexStyle = 'flex justify-between';
  const itemGridStyle = 'grid grid-cols-[20px_1fr_auto] gap-3';
  const fontBold = !hasIcon && isSelected ? 'font-semibold' : '';

  return `${itemDefaultStyle} ${
    isDefault ? itemFlexStyle : itemGridStyle
  } ${fontBold}`;
};

export default Dropdown;

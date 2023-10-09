import { HTMLAttributes, ReactNode, forwardRef, useRef, useState } from 'react';
import CheckCircle from './CheckCircle';
import Button from './Button';
import Icon from '../ui/Icon';
import useModalOutside from '@/hook/useClickOutside';
import useCalculateMenuPosition from '@/hook/useCalculateMenuPosition';

interface DropdownMenuBtnProps {
  label: string;
  onClick?: () => void;
  children: ReactNode;
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
  selectedItem?: string[]; // TODO 타입 설정 구체화
  hasIcon?: boolean;
  onSelect: (item: string) => void;
  children?: ReactNode;
}

const Dropdown = ({ label, menuTitle, onClick, children }: DropdownProps) => {
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
    <div ref={containerRef} className="relative h-full">
      <Button onClick={handleMenuBtnClick} mode="ghost" size="max">
        {label}
        <Icon name="ArrowDown" color="text" />
      </Button>
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

Dropdown.Menu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ children, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        {...rest}
        className="absolute z-10 w-60 rounded-lg border border-border text-sm"
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
  selectedItem = [],
  hasIcon = true,
  onSelect,
  children,
}: DropdownItemProps) => {
  const isSelected = selectedItem.includes(value);
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

const getItemStyle = (
  hasIcon: boolean,
  isSelected: boolean,
  isDefault: boolean,
) => {
  const itemDefaultStyle =
    'h-[45px] px-5 items-center bg-neutralWeak border-b border-b-border last:border-b-0 last:rounded-b-lg hover:bg-white cursor-pointer';
  const itemFlexStyle = 'flex justify-between';
  const itemGridStyle = 'grid grid-cols-[20px_1fr_auto] gap-3';
  const fontBold = !hasIcon && isSelected ? 'font-semibold' : '';

  return `${itemDefaultStyle} ${
    isDefault ? itemFlexStyle : itemGridStyle
  } ${fontBold}`;
};

export default Dropdown;

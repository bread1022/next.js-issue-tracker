import { ReactNode, useState } from 'react';
import CheckCircle from './CheckCircle';
import Button from './Button';
import Icon from '../ui/Icon';
import useModalOutside from '@/hook/useClickOutside';

interface DropdownMenuBtnProps {
  label: string;
  onClick: () => void;
  children: ReactNode;
}

interface DropdownMenuProps {
  align?: 'left' | 'center' | 'right';
  children: ReactNode;
}

interface DropdownProps extends DropdownMenuBtnProps, DropdownMenuProps {
  menuTitle?: string;
}

interface DropdownItemProps {
  item: string;
  selectedItem: string[]; // TODO 타입 설정 구체화
  hasIcon?: boolean;
  onSelect: (item: string) => void;
  children?: ReactNode;
}

const Dropdown = ({
  label,
  menuTitle,
  align,
  onClick,
  children,
}: DropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuBtnClick = () => {
    onClick();
    handleMenuToggle();
  };

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const handleMenuClose = () => setIsMenuOpen(false);

  const ref = useModalOutside({ onClose: handleMenuClose });

  return (
    <div ref={ref} className="relative h-full">
      <Button onClick={handleMenuBtnClick} mode="ghost" size="max">
        {label}
        <Icon name="ArrowDown" color="text" />
      </Button>
      {isMenuOpen && (
        // TODO: useLayoutEffect 적용 고려해보기
        <Dropdown.Menu align={align}>
          {menuTitle && <Dropdown.Header>{menuTitle}</Dropdown.Header>}
          <ul className={`${!menuTitle && 'rounded-t-lg overflow-hidden'}`}>
            {children}
          </ul>
        </Dropdown.Menu>
      )}
    </div>
  );
};

Dropdown.Menu = ({ align = 'left', children }: DropdownMenuProps) => {
  return <section className={getDropdownMenuStyle(align)}>{children}</section>;
};

const getDropdownMenuStyle = (align: 'left' | 'center' | 'right') => {
  const alignStyle = {
    left: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    right: 'right-3',
  }[align];
  return `absolute ${alignStyle} z-10 w-60 rounded-lg border border-border text-sm`;
};

Dropdown.Header = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="h-[40px] px-5 leading-10 rounded-t-lg bg-neutral border-b border-b-border">
      {children}
    </h1>
  );
};

Dropdown.Item = ({
  item,
  selectedItem,
  hasIcon = true,
  onSelect,
  children,
}: DropdownItemProps) => {
  const isSelected = selectedItem.includes(item);
  const isDefault = children === undefined;

  const handleSelect = () => onSelect(item);

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

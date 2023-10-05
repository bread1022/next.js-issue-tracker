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
  title?: string;
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
  title,
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
    <div ref={ref} className="relative">
      <Button onClick={handleMenuBtnClick} color="ghost" size="max">
        {label}
        <Icon name="ArrowDown" color="text" />
      </Button>
      {isMenuOpen && (
        <Dropdown.Menu align={align}>
          {title && <Dropdown.Header>{title}</Dropdown.Header>}
          <ul className={`${!title && 'rounded-t-lg overflow-hidden'}`}>
            {children}
          </ul>
        </Dropdown.Menu>
      )}
    </div>
  );
};

Dropdown.Menu = ({ align = 'left', children }: DropdownMenuProps) => {
  const alignStyle = {
    left: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    right: 'right-3',
  }[align];

  return (
    <section
      className={`absolute ${alignStyle} z-10 w-60 rounded-lg border border-border text-sm`}
    >
      {children}
    </section>
  );
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
  const fontBold = !hasIcon && isSelected ? 'font-semibold' : '';
  const isDefault = children === undefined;

  const handleSelect = () => onSelect(item);

  return (
    <li
      className={`${itemDefaultStyle} ${
        isDefault ? itemFlexStyle : itemGridStyle
      } ${fontBold}`}
      onClick={handleSelect}
    >
      {children}
      <span className="grow">{item}</span>
      {hasIcon && <CheckCircle checked={isSelected} />}
    </li>
  );
};

const itemDefaultStyle =
  'h-[45px] px-3 items-center bg-neutralWeak border-b border-b-border last:border-b-0 last:rounded-b-lg hover:bg-white cursor-pointer';
const itemFlexStyle = 'flex justify-between';
const itemGridStyle = 'grid grid-cols-[20px_1fr_auto] gap-2';

export default Dropdown;

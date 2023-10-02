import Button from '../Common/Button';
import Icon from '../ui/Icon';

interface SelectMenuBtnProps {
  label: string;
  onClick: () => void;
}

export default function SelectMenuBtn({ label, onClick }: SelectMenuBtnProps) {
  return (
    <Button onClick={onClick} color="ghost" size="max">
      {label}
      <Icon name="ArrowDown" color="text" />
    </Button>
  );
}

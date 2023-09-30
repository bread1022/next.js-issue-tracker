import Button from "../Common/Button";
import { ArrowDownIcon } from "../ui";

interface SelectMenuBtnProps {
  label: string;
  onClick: () => void;
}

export default function SelectMenuBtn({ label, onClick }: SelectMenuBtnProps) {
  return (
    <Button onClick={onClick}>
      {label}
      <ArrowDownIcon />
    </Button>
  );
}
import Button from '../Common/Button';
import { LabelIcon } from '../ui';

interface LabelBtnProps {
  count?: number;
}

export default function LabelBtn({ count }: LabelBtnProps) {
  return (
    <Button.Link href={'/label'}>
      <LabelIcon />
      레이블
      {!!count && <p className="text-xs">({count})</p>}
    </Button.Link>
  );
}

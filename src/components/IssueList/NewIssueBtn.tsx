import Button from '../Common/Button';
import Icon from '../ui/Icon';

export default function NewIssueBtn() {
  return (
    <Button.Link href={'/new'} mode="primary">
      <Icon name="Plus" color="white" />
      이슈 작성
    </Button.Link>
  );
}

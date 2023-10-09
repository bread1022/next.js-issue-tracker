import Button from '../../Common/Button';
import Icon from '../../ui/Icon';

const NewIssueBtn = () => {
  return (
    <Button.Link href={'/new'} mode="primary">
      <Icon name="Plus" color="white" />
      이슈 작성
    </Button.Link>
  );
};

export default NewIssueBtn;

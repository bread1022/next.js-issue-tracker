import Button from "../Common/Button";
import { PlusIcon } from "../ui";

export default function NewIssueBtn() {
  return (
    <Button.Link href={'/new'} color="primary">
      <PlusIcon />
      이슈 작성
    </Button.Link>
  );
}
import Button from '@/components/Common/Button';
import Icon from '@/components/ui/Icon';
import { useIssueFilterDispatch } from '@/context/IssueFilterContext';

export default function FilterResetBtn() {
  const { onResetFilter } = useIssueFilterDispatch();

  return (
    <Button mode="ghost" size="sm" onClick={onResetFilter}>
      <Icon name="Close" /> 현재의 검색 필터 및 정렬 지우기
    </Button>
  );
}

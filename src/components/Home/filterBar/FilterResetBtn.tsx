import Button from '@/components/Common/Button';
import Icon from '@/components/ui/Icon';

export default function FilterResetBtn() {
  return (
    <Button color="ghost" size="sm">
      <Icon name="Close" /> 현재의 검색 필터 및 정렬 지우기
    </Button>
  );
}

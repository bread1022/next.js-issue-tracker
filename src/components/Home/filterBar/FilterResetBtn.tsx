import Button from "@/components/Common/Button";
import { CloseIcon } from "@/components/ui";

export default function FilterResetBtn() {
  return (
    <Button size="sm">
      <CloseIcon/> 현재의 검색 필터 및 정렬 지우기
    </Button>
  );
}
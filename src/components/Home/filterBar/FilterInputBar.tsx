'use client';

import useFocus from '@/hook/useFocus';
import Icon from '@/components/ui/Icon';
import Dropdown from '@/components/Common/Dropdown';

interface FilterInputBarProps {}

const FilterInputBar = ({}: FilterInputBarProps) => {
  const { isFocus, onFocus, onBlur } = useFocus();

  // TODO: 필터 버튼 클릭시, Constants 목록 가져오기
  const handleFilterBarBtn = () => console.log('필터버튼 클릭');

  const handleSelectFilter = () => console.log('필터 선택');

  return (
    <div className={`flex items-center rounded-mds text-sm`}>
      <div className="h-[40px] rounded-l-md border border-border border-e-transparent">
        <Dropdown label="필터" title="이슈 필터" onClick={handleFilterBarBtn}>
          {[
            '열린 이슈',
            '내가 작성한 이슈',
            '나에게 할당된 이슈',
            '내가 댓글을 남긴 이슈',
            '닫힌 이슈',
          ].map((filter, idx) => (
            <Dropdown.Item
              key={idx}
              item={filter}
              selectedItem={[]}
              onSelect={handleSelectFilter}
            />
          ))}
        </Dropdown>
      </div>
      <label htmlFor="filterbar" className="relative block w-full">
        <Icon
          name="Search"
          color="textLight"
          className="absolute top-3 left-3"
        />
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          id="filterbar"
          type="text"
          placeholder={'initial filter status'}
          className={`block w-80 h-[40px] pl-9 pr-3 rounded-r-md overflow-hidden outline-none border  ${
            isFocus ? 'bg-white border-primary' : 'bg-neutralText border-border'
          } placeholder:text-textLight`}
        />
      </label>
    </div>
  );
};

export default FilterInputBar;

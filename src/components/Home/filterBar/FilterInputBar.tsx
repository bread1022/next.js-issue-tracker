'use client';

import SelectMenuBtn from '../SelectMenuBtn';
import useFocus from '@/hook/useFocus';
import Icon from '@/components/ui/Icon';

interface FilterInputBarProps {}

const FilterInputBar = ({}: FilterInputBarProps) => {
  const { isFocus, onFocus, onBlur } = useFocus();

  const handleFilterBarBtn = () => console.log('필터버튼 클릭');

  return (
    <div className={`w-96 flex items-center rounded-md overflow-auto text-sm`}>
      <div className="h-[40px] rounded-l-md border border-border border-e-transparent">
        <SelectMenuBtn label="필터" onClick={handleFilterBarBtn} />
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
          className={`block w-full h-[40px] pl-9 pr-3 rounded-r-md overflow-hidden outline-none border  ${
            isFocus ? 'bg-white border-primary' : 'bg-neutralText border-border'
          } placeholder:text-textLight`}
        />
      </label>
    </div>
  );
};

export default FilterInputBar;

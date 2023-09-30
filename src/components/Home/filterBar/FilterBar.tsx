'use client';

import { SearchIcon } from "@/components/ui";
import SelectMenuBtn from "../SelectMenuBtn";
import useFocus from "@/hook/useFocus";

interface FilterBarProps {

}

const FilterBar = ({  }: FilterBarProps) => {
  const { isFocus, onFocus, onBlur } = useFocus();

  const handleFilterBarBtn = () => console.log('필터버튼 클릭');

  return (
    <div className={`w-96 flex items-center rounded-md overflow-auto text-sm`} >
      <div className="h-[40px] rounded-l-md border border-zinc-400 border-e-transparent">
        <SelectMenuBtn label="필터" onClick={handleFilterBarBtn} />
      </div>
      <label htmlFor="filterbar" className="relative block w-full">
        <SearchIcon className="absolute top-3 left-3"/>
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          id="filterbar" type="text"
          placeholder={'initial filter status'}
          className={`block w-full h-[40px] pl-9 pr-3 rounded-r-md overflow-hidden outline-none border  ${isFocus ? 'bg-white border-blue-400' : 'bg-zinc-200 border-zinc-400'} placeholder:text-zinc-400`}/>
      </label>
    </div>
  );
}

export default FilterBar;
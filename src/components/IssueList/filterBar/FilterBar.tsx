'use client';

import { useIssueFilterState } from '@/context/IssueFilterContext';
import FilterInputBar from './FilterInputBar';
import FilterResetBtn from './FilterResetBtn';

const FilterBar = () => {
  const { isInitial } = useIssueFilterState();

  return (
    <div className="w-max h-24 flex flex-col justify-between gap-3">
      <FilterInputBar />
      {isInitial || <FilterResetBtn />}
    </div>
  );
};

export default FilterBar;

'use client';

import { useIssueFilterState } from '@/context/IssueFilterContext';
import FilterInputBar from './FilterInputBar';
import FilterResetBtn from './FilterResetBtn';

const FilterBar = () => {
  const filterState = useIssueFilterState();
  const { isOpen, author, labels, assignee, comment } = filterState;
  const isFiltered =
    isOpen &&
    author === null &&
    labels.length === 0 &&
    assignee === null &&
    comment === null;

  return (
    <div className="w-max h-24 flex flex-col justify-between gap-3">
      <FilterInputBar />
      {isFiltered || <FilterResetBtn />}
    </div>
  );
};

export default FilterBar;

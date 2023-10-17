'use client';

import {
  useIssueFilterDispatch,
  useIssueFilterState,
} from '@/context/IssueFilterContext';
import FilterInputBar from './FilterInputBar';
import FilterResetBtn from './FilterResetBtn';
import { FilterType, isFilterSet } from '@/service/filter';

const FilterBar = () => {
  const filterState = useIssueFilterState();
  const {
    onFilterOpen,
    onFilterClose,
    onFilterByAuthor,
    onFilterByAssignee,
    onFilterByComment,
  } = useIssueFilterDispatch();

  const isFiltered = isFilterSet(filterState);

  const handleFilterSelect = (value: FilterType) => {
    const filterActions = {
      open: onFilterOpen,
      close: onFilterClose,
      author: () => onFilterByAuthor('me'),
      assignee: () => onFilterByAssignee('me'),
      comment: () => onFilterByComment('me'),
    };
    return filterActions[value]();
  };

  return (
    <div className="w-max h-24 flex flex-col justify-between gap-3">
      <FilterInputBar filterState={filterState} onSelect={handleFilterSelect} />
      {isFiltered || <FilterResetBtn />}
    </div>
  );
};

export default FilterBar;

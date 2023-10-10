import FilterInputBar from './FilterInputBar';
import FilterResetBtn from './FilterResetBtn';

const FilterBar = () => {
  return (
    <div className="w-max flex flex-col gap-3 mb-3">
      <FilterInputBar />
      <FilterResetBtn />
    </div>
  );
};

export default FilterBar;

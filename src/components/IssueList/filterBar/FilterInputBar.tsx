import useFocus from '@/hook/useFocus';
import Icon from '@/components/ui/Icon';
import Dropdown from '@/components/Common/Dropdown';
import { FILTERBAR_MENU } from './constant';
import {
  FilterTypeWithoutLabels,
  getPlaceholder,
  getSelectedFilterBarItem,
} from '@/service/filter';
import { FilterState } from '@/context/IssueFilterContext';

interface FilterInputBarProps {
  filterState: FilterState;
  onSelect: (value: FilterTypeWithoutLabels) => void;
}

const FilterInputBar = ({ filterState, onSelect }: FilterInputBarProps) => {
  const { isFocus, onFocus, onBlur } = useFocus();

  const handleFilterSelect = (value: string) =>
    onSelect(value as FilterTypeWithoutLabels);

  const currentPlaceholder = getPlaceholder(filterState);

  const isSelected = (value: FilterTypeWithoutLabels) =>
    getSelectedFilterBarItem(filterState, value);

  return (
    <div className={`h-[40px] flex items-center rounded-mds text-sm`}>
      <div className="h-full rounded-l-md border border-border border-e-transparent">
        {FILTERBAR_MENU.map(({ label, menuTitle, items }) => (
          <Dropdown key={label} label={label} menuTitle={menuTitle}>
            {items.map((item) => (
              <Dropdown.Item
                key={item.label}
                item={item.label}
                value={item.value}
                isSelected={isSelected(item.value)}
                onSelect={handleFilterSelect}
              />
            ))}
          </Dropdown>
        ))}
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
          placeholder={currentPlaceholder}
          className={getInputStyle(isFocus)}
        />
      </label>
    </div>
  );
};

const getInputStyle = (isFocus: boolean) => {
  const focusStyle = 'bg-white border-primary';
  const blurStyle = 'bg-neutralText border-border';

  return `block min-w-[30rem] w-full h-[40px] pl-9 pr-3 rounded-r-md overflow-hidden outline-none border  ${
    isFocus ? focusStyle : blurStyle
  } placeholder:text-textLight`;
};

export default FilterInputBar;

import useFocus from '@/hook/useFocus';
import Icon from '@/components/ui/Icon';
import Dropdown from '@/components/Common/Dropdown';
import { FILTERBAR_MENU } from './constant';
import {
  FilterTypeWithoutLabels,
  getPlaceholder,
  checkSelectedItem,
} from '@/service/filter';
import {
  useIssueFilterDispatch,
  useIssueFilterState,
} from '@/context/IssueFilterContext';
import { ChangeEvent, useEffect, useState } from 'react';

const FilterInputBar = () => {
  const { isFocus, onFocus, onBlur } = useFocus();
  const filterState = useIssueFilterState();
  const {
    onFilterOpen,
    onFilterClose,
    onFilterByAuthor,
    onFilterByAssignee,
    onFilterByComment,
  } = useIssueFilterDispatch();

  const handleSelectedItem = (value: FilterTypeWithoutLabels) =>
    checkSelectedItem(filterState, value);

  const handleSelectFilter = (value: string) => {
    const filters: Record<string, () => void> = {
      open: onFilterOpen,
      close: onFilterClose,
      author: () => onFilterByAuthor('me'),
      assignee: () => onFilterByAssignee('me'),
      comment: () => onFilterByComment('me'),
    };
    return filters[value]();
  };

  const [input, setInput] = useState('');

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInput(target.value);
  };

  useEffect(() => {
    const setPlaceholder = () => {
      const placeholder = getPlaceholder(filterState);
      setInput(placeholder);
    };
    setPlaceholder();
  }, [filterState]);

  return (
    <div className={`h-[40px] w-full flex items-center rounded-mds text-xs web:text-sm`}>
      <div className="h-full rounded-l-md border border-border border-e-transparent">
        {FILTERBAR_MENU.map(({ label, menuTitle, items }) => (
          <Dropdown key={label} size="md" label={label} menuTitle={menuTitle}>
            {items.map((item) => (
              <Dropdown.Item
                key={item.label}
                item={item.label}
                value={item.value}
                isSelected={handleSelectedItem(item.value)}
                onSelect={handleSelectFilter}
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
          value={input}
          className={getInputStyle(isFocus)}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
};

const getInputStyle = (isFocus: boolean) => {
  const focusStyle = 'bg-white border-primary';
  const blurStyle = 'bg-neutralText border-border';

  return `w-full h-[40px] pl-9 pr-3 rounded-r-md overflow-hidden outline-none border  ${
    isFocus ? focusStyle : blurStyle
  } placeholder:text-textLight`;
};

export default FilterInputBar;

import useFocus from '@/hook/useFocus';
import Icon from '@/components/ui/Icon';
import Dropdown from '@/components/Common/Dropdown';
import { FILTERBAR_MENU } from './constant';

interface FilterInputBarProps {}

const FilterInputBar = ({}: FilterInputBarProps) => {
  const { isFocus, onFocus, onBlur } = useFocus();

  const handleSelectFilter = () => console.log('필터 선택');

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
                selectedItem={[]}
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
          placeholder={'initial filter status'}
          className={getInputStyle(isFocus)}
        />
      </label>
    </div>
  );
};

const getInputStyle = (isFocus: boolean) => {
  const focusStyle = 'bg-white border-primary';
  const blurStyle = 'bg-neutralText border-border';

  return `block w-80 h-[40px] pl-9 pr-3 rounded-r-md overflow-hidden outline-none border  ${
    isFocus ? focusStyle : blurStyle
  } placeholder:text-textLight`;
};

export default FilterInputBar;

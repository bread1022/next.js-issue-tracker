import Icon from '../../ui/Icon';

interface CheckBoxProps {
  id: 'all' | number;
  checked: boolean;
  onClick: (id: number) => void;
}

const checkBoxFillIcons = {
  all: <Icon name="CheckBoxFillMinus" color="primary" />,
  default: <Icon name="CheckBoxFill" color="primary" />,
};

const CheckBox = ({ id, checked, onClick }: CheckBoxProps) => {
  const type = id === 'all' ? 'all' : 'default';
  const itemId = id === 'all' ? 0 : id;

  const handleCheckBoxClick = () => onClick(itemId);

  return (
    <button onClick={handleCheckBoxClick} className="cursor-pointer m-auto">
      {checked ? (
        checkBoxFillIcons[type]
      ) : (
        <Icon name="UnCheckBox" color="border" />
      )}
    </button>
  );
};

export default CheckBox;

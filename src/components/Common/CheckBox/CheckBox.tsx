import Icon from '../../ui/Icon';

interface CheckBoxProps {
  id: 'all' | string;
  checked: boolean;
  onClick: (id: string) => void;
}

const checkBoxFillIcons = {
  all: <Icon name="CheckBoxFillMinus" color="primary" />,
  default: <Icon name="CheckBoxFill" color="primary" />,
};

const CheckBox = ({ id, checked, onClick }: CheckBoxProps) => {
  const type = id === 'all' ? 'all' : 'default';

  const handleCheckBoxClick = () => onClick(id);

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

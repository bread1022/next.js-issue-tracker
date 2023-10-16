import LabelTag from '@/components/Common/LabelTag';
import { SideBarItem } from './SideBarDropdown';
interface SelectedLabelsProps {
  labels: SideBarItem[];
}

const SelectedLabels = ({ labels }: SelectedLabelsProps) => {
  return (
    <ul className="w-full flex flex-wrap gap-1">
      {labels.map(({ menuItem, menuIcon, menuColor }) => (
        <li key={menuItem}>
          <LabelTag
            labelName={menuItem}
            backgroundColor={menuIcon}
            fontColor={menuColor as 'white' | 'black'}
          />
        </li>
      ))}
    </ul>
  );
};

export default SelectedLabels;

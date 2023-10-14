import Icon from '../ui/Icon';

interface StatusLabelProps {
  isOpen: boolean;
}

const StatusLabel = ({ isOpen }: StatusLabelProps) => {
  return (
    <div className={getStatusLabelStyle(isOpen)}>
      <Icon name={`${isOpen ? 'OpenIssue' : 'CloseIssue'}`} color="white" />
      <span className="text-white text-sm">
        {isOpen ? '열린 이슈' : '닫힌 이슈'}
      </span>
    </div>
  );
};

const getStatusLabelStyle = (isOpen: boolean) => {
  const defaultStyle = 'w-max py-1.5 px-3 rounded-full flex items-center gap-1';
  return isOpen ? `${defaultStyle} bg-primary` : `${defaultStyle} bg-secondary`;
};

export default StatusLabel;

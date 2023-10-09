import { Fragment, ReactNode } from 'react';
import { avatarSize } from './Avatar';
import Icon from '../ui/Icon';

type Size = 'sm' | 'md' | 'lg';

type SizeProps = Pick<SkeletoneProps, 'size'>;

interface SkeletoneProps {
  type: 'list' | 'text' | 'avatar' | 'menuItem';
  size?: Size;
  children?: ReactNode;
}

const Skeletone = ({ type, size = 'sm', children }: SkeletoneProps) => {
  const SKELETONE_COUNT = Array.from({ length: 5 }, (_, i) => i);
  const skeletoneTypes = {
    avatar: <Skeletone.Avatar size={size} />,
    text: <Skeletone.Text size={size} />,
    list: SKELETONE_COUNT.map((_, index) => <Skeletone.ListItem key={index} />),
    menuItem: SKELETONE_COUNT.map((_, index) => (
      <Skeletone.MenuItem key={index} />
    )),
  };
  return <>{children ? children : skeletoneTypes[type]}</>;
};

Skeletone.Avatar = ({ size = 'sm' }: SizeProps) => {
  return (
    <div
      className={`${skeletoneAnimaion} ${getSkeletonAvatarStyle(size)}`}
    ></div>
  );
};

Skeletone.Text = ({ size = 'sm' }: SizeProps) => {
  return (
    <div className={`${skeletoneAnimaion} ${getSkeletonTextStyle(size)}`}></div>
  );
};

Skeletone.ListItem = () => {
  return (
    <li
      className={`relative h-24 min-w-[965px] grid grid-cols-[40px_1fr_auto] items-center ${listStyle}`}
    >
      <div className="m-auto">
        <Icon name="UnCheckBox" color="border" />
      </div>
      <div className="mx-3 flex flex-col gap-2">
        <Skeletone.Text size="md" />
        <div className="flex gap-2">
          <Skeletone.Text />
          <Skeletone.Text size="lg" />
        </div>
      </div>
      <div className="w-64 grid grid-cols-3">
        <div className="px-3 col-start-3 mx-auto">
          <Skeletone.Avatar />
        </div>
      </div>
    </li>
  );
};

Skeletone.MenuItem = () => {
  return (
    <li
      className={`relative h-[45px] w-60 px-5 flex items-center gap-3 ${listStyle}`}
    >
      <Skeletone.Avatar />
      <Skeletone.Text size="md" />
    </li>
  );
};

const skeletoneAnimaion =
  'before:absolute before:animate-loading before:bg-gradient-to-r before:from-gray-200 before:via-gray-100 before:to-gray-200 before:h-10 before:w-3/4';

const listStyle =
  'bg-neutralWeak border-b border-b-border last:border-b-0 last:rounded-b-lg';

const getSkeletonAvatarStyle = (size: Size) => {
  return `relative rounded-full bg-gray-200 overflow-hidden ${avatarSize[size]}`;
};

const getSkeletonTextStyle = (size: Size) => {
  const sizes = {
    sm: 'w-10',
    md: 'w-20',
    lg: 'w-40',
  };
  return `relative h-3.5 rounded-sm bg-gray-200 overflow-hidden ${sizes[size]}`;
};

export default Skeletone;

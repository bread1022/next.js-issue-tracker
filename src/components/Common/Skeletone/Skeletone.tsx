import { ReactNode } from 'react';
import { avatarSize } from '../Avatar';
import Icon from '../../ui/Icon';

type Size = 'sm' | 'md' | 'lg';

type SizeProps = Pick<SkeletoneProps, 'size'>;

interface SkeletoneProps {
  type:
    | 'list'
    | 'text'
    | 'avatar'
    | 'menuItem'
    | 'title'
    | 'sideBar'
    | 'comment';
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
    title: <Skeletone.Title />,
    sideBar: <Skeletone.SideBar />,
    comment: <Skeletone.Comment />,
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
      className={`relative h-24 w-full grid grid-cols-[40px_2fr_minmax(160px,_1fr)] items-center ${listStyle}`}
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
      <div className="w-64 grid grid-cols-3 gap-2">
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

Skeletone.Title = () => {
  return (
    <div className="h-full flex flex-col gap-3 px-2 py-5 border-b border-border">
      <div
        className={`relative h-8 w-52 bg-gray-200 overflow-hidden ${skeletoneAnimaion}`}
      />
      <div className="flex gap-3">
        <Skeletone.Text size="lg" />
        <Skeletone.Text size="lg" />
      </div>
    </div>
  );
};

Skeletone.SideBar = () => {
  return (
    <div className="w-[274px] h-max min-h-[381px] p-7 bg-neutralWeak border border-border rounded-lg">
      <div className="flex flex-col gap-40">
        <Skeletone.Text size="lg" />
        <Skeletone.Text size="lg" />
      </div>
    </div>
  );
};

Skeletone.Comment = () => {
  return (
    <div className="h-max rounded-lg border border-border">
      <div className="h-16 rounded-t-lg bg-neutral border-b border-border flex items-center gap-3 p-3">
        <Skeletone.Avatar />
        <Skeletone.Text size="sm" />
      </div>
      <div className="h-16 px-3 flex items-center gap-3 bg-white rounded-b-lg">
        <Skeletone.Text size="lg" />
        <Skeletone.Text size="md" />
      </div>
    </div>
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

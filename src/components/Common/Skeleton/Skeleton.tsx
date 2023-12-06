import { ReactNode } from 'react';
import { avatarSize } from '../Avatar';
import Icon from '../../ui/Icon';

type Size = 'sm' | 'md' | 'lg';

type SizeProps = Pick<SkeletonProps, 'size'>;

interface SkeletonProps {
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

const Skeleton = ({ type, size = 'sm', children }: SkeletonProps) => {
  const Skeleton_COUNT = Array.from({ length: 5 }, (_, i) => i);
  const SkeletonTypes = {
    avatar: <Skeleton.Avatar size={size} />,
    text: <Skeleton.Text size={size} />,
    list: Skeleton_COUNT.map((_, index) => <Skeleton.ListItem key={index} />),
    menuItem: Skeleton_COUNT.map((_, index) => (
      <Skeleton.MenuItem key={index} />
    )),
    title: <Skeleton.Title />,
    sideBar: <Skeleton.SideBar />,
    comment: <Skeleton.Comment />,
  };
  return <>{children ? children : SkeletonTypes[type]}</>;
};

Skeleton.Avatar = ({ size = 'sm' }: SizeProps) => {
  return (
    <div className={`${SkeletonAnimaion} ${getSkeletonAvatarStyle(size)}`} />
  );
};

Skeleton.Text = ({ size = 'sm' }: SizeProps) => {
  return (
    <div className={`${SkeletonAnimaion} ${getSkeletonTextStyle(size)}`} />
  );
};

Skeleton.ListItem = () => {
  return (
    <li
      className={`relative h-24 w-full grid grid-cols-[40px_2fr_minmax(160px,_1fr)] items-center ${listStyle}`}
    >
      <div className="m-auto">
        <Icon name="UnCheckBox" color="border" />
      </div>
      <div className="mx-3 flex flex-col gap-2">
        <Skeleton.Text size="md" />
        <div className="flex gap-2">
          <Skeleton.Text />
          <Skeleton.Text size="lg" />
        </div>
      </div>
      <div className="w-64 grid grid-cols-3 gap-2">
        <div className="px-3 col-start-3 mx-auto">
          <Skeleton.Avatar />
        </div>
      </div>
    </li>
  );
};

Skeleton.MenuItem = () => {
  return (
    <li
      className={`relative h-[45px] w-60 px-5 flex items-center gap-3 ${listStyle}`}
    >
      <Skeleton.Avatar />
      <Skeleton.Text size="md" />
    </li>
  );
};

Skeleton.Title = () => {
  return (
    <div className="h-full flex flex-col gap-3 px-2 py-5 border-b border-border">
      <div
        className={`relative h-8 w-52 bg-gray-200 overflow-hidden ${SkeletonAnimaion}`}
      />
      <div className="flex gap-3">
        <Skeleton.Text size="lg" />
        <Skeleton.Text size="lg" />
      </div>
    </div>
  );
};

Skeleton.SideBar = () => {
  return (
    <div className="w-[274px] h-max min-h-[381px] p-7 bg-neutralWeak border border-border rounded-lg">
      <div className="flex flex-col gap-40">
        <Skeleton.Text size="lg" />
        <Skeleton.Text size="lg" />
      </div>
    </div>
  );
};

Skeleton.Comment = () => {
  return (
    <div className="h-max rounded-lg border border-border">
      <div className="h-16 rounded-t-lg bg-neutral border-b border-border flex items-center gap-3 p-3">
        <Skeleton.Avatar />
        <Skeleton.Text size="sm" />
      </div>
      <div className="h-16 px-3 flex items-center gap-3 bg-white rounded-b-lg">
        <Skeleton.Text size="lg" />
        <Skeleton.Text size="md" />
      </div>
    </div>
  );
};

const SkeletonAnimaion =
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

export default Skeleton;

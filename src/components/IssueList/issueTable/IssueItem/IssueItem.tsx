import { IssueType } from '@/app/model/issue';
import Avatar from '@/components/Common/Avatar';
import CheckBox from '@/components/Common/CheckBox';
import LabelTag from '@/components/Common/LabelTag';
import Icon from '@/components/ui/Icon';
import getElapsedTime from '@/utils/date';
import Link from 'next/link';

interface issueItemProps {
  item: IssueType;
  checked: boolean;
  onCheck: (id: string) => void;
}

const IssueItem = ({ item, checked, onCheck }: issueItemProps) => {
  const { id, title, isOpen, assignees, labels, author, createdAt } = item;
  const statusIcon = isOpen ? 'OpenIssue' : 'CloseIssue';

  return (
    <li className="h-24 pr-5 grid grid-cols-[40px_3fr_minmax(300px,_1fr)] items-center text-sm bg-neutralWeak border-b border-border last:border-b-0 last:rounded-b-lg hover:bg-white">
      <CheckBox id={id} checked={checked} onClick={onCheck} />
      <div className="mx-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {<Icon name={statusIcon} color="primary" />}
          <Link href={`/issue/${id}`} className="font-semibold">
            {title}
          </Link>
          <ul className="flex gap-1">
            {labels.map(({ labelName, backgroundColor, fontColor }) => (
              <li key={labelName}>
                <LabelTag
                  labelName={labelName}
                  backgroundColor={backgroundColor}
                  fontColor={fontColor}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2">
          <span>#{id}</span>
          <span>
            이 이슈가 {getElapsedTime(createdAt)}, {author.userId}님에 의해
            작성되었습니다
          </span>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-10">
        <ul className="group flex col-start-1 justify-center">
          {assignees.map(({ userImage, userId }, index) => (
            <li
              key={userImage}
              style={{
                transform: `translateX(-${index * 10}px)`,
              }}
              className="cursor-pointer"
            >
              <Avatar src={userImage} alt={userId} size="sm" />
            </li>
          ))}
        </ul>
        <div className="col-start-3">
          <Avatar src={author.userImage} alt={author.userId} size="sm" />
        </div>
      </div>
    </li>
  );
};

const getAssigneeStyle = (index: number) => {
  return `cursor-pointer -translate-x-${
    index * 2
  } transition-transform group-hover:translate-x-0`;
};

export default IssueItem;

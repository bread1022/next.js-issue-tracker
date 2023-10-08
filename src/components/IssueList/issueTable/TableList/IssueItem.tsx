import Avatar from '@/components/Common/Avatar';
import CheckBox from '@/components/Common/CheckBox';
import LabelTag from '@/components/Common/LabelTag';
import Icon from '@/components/ui/Icon';
import getElapsedTime from '@/utils/getElapsedTime';
import Link from 'next/link';

import { IssueType } from '@/service/issues';

interface issueItemProps {
  item: IssueType;
  checked: boolean;
  onCheck: (id: number) => void;
}

const IssueItem = ({ item, checked, onCheck }: issueItemProps) => {
  const { id, title, isOpen, assignees, labels, author, createdAt } = item;
  const statusIcon = isOpen ? 'OpenIssue' : 'CloseIssue';

  return (
    <li className="h-24 grid grid-cols-[25px_1fr_auto] items-center text-sm border-b border-border last:border-b-0">
      <CheckBox id={id} checked={checked} onClick={onCheck} />
      <div className="mx-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {<Icon name={statusIcon} color="primary" />}
          <Link href={`/issues/${id}`} className="font-semibold">
            {title}
          </Link>
          <div className="flex gap-1">
            {labels.map(({ id, labelName, backgroundColor, fontColor }) => (
              <LabelTag
                key={id}
                labelName={labelName}
                backgroundColor={backgroundColor}
                fontColor={fontColor}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <span>#{id}</span>
          <span>
            이 이슈가 {getElapsedTime(createdAt)}, {author.userId}님에 의해
            작성되었습니다
          </span>
        </div>
      </div>
      <div className="w-72 grid grid-cols-3">
        <ul className="group flex px-3 col-start-1">
          {assignees.map(({ id, userImage, userId }, index) => {
            return (
              <li key={id} className={getAssigneeStyle(index)}>
                <Avatar src={userImage} alt={userId} size="sm" />
              </li>
            );
          })}
        </ul>
        <div className="px-3 col-start-3">
          <Avatar src={author.userImage} alt={author.userId} size="sm" />
        </div>
      </div>
    </li>
  );
};

const getAssigneeStyle = (index: number) => {
  return `cursor-pointer -translate-x-${index} transition-transform group-hover:translate-x-0`;
};

export default IssueItem;

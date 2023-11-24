import { IssueType } from '@/model/issue';
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
  const issueId = id.slice(-4);
  const statusIcon = isOpen ? 'OpenIssue' : 'CloseIssue';

  return (
    <li className="h-24 pr-5 grid grid-cols-[40px_1fr_auto] items-center text-xs web:text-sm bg-neutralWeak border-b border-border last:border-b-0 last:rounded-b-lg hover:bg-white">
      <CheckBox id={id} checked={checked} onClick={onCheck} />
      <div className="mx-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {<Icon name={statusIcon} color="primary" />}
          <Link href={`/issue/${id}`} className="font-semibold">
            {title}
          </Link>
          {labels.length > 0 && (
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
          )}
        </div>
        <div className="flex gap-2 overflow-ellipsis">
          <span>#{issueId}</span>
          <span>
            이 이슈가 {getElapsedTime(createdAt)}, {author.userId}님에 의해
            작성되었습니다
          </span>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-10">
        {assignees.length > 0 && (
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
        )}
        <div className="col-start-3">
          <Avatar src={author.userImage} alt={author.userId} size="sm" />
        </div>
      </div>
    </li>
  );
};

export default IssueItem;

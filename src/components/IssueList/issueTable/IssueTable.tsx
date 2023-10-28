'use client';

import IssueItem from './IssueItem/IssueItem';
import Skeletone from '@/components/Common/Skeletone';
import IssueEmptyItem from './IssueItem/IssueEmptyItem';
import {
  useIssueCheckDispatch,
  useIssueCheckState,
} from '@/context/IssueCheckContext';
import { useEffect } from 'react';
import useIssueList from '@/hook/issueList';

const IssueTable = () => {
  const { data: issues, isLoading } = useIssueList();

  console.log(issues);

  const { checkedAll, checkeditems } = useIssueCheckState();
  const { onCheckAllIn, onCheck } = useIssueCheckDispatch();

  const handleCheckIssue = (id: string) => onCheck(id);

  useEffect(() => {
    if (!checkedAll) return;
    const checkeditems = issues?.map((issue) => issue.id) || [];
    onCheckAllIn(checkeditems);
  }, [checkedAll, issues, onCheckAllIn]);

  // TODO: 페이지 네이션 !!!
  return (
    <ul>
      {isLoading && <Skeletone type="list" />}
      {!isLoading &&
        (issues && issues.length > 0 ? (
          issues.map((issue) => (
            <IssueItem
              key={issue.id}
              item={issue}
              checked={checkeditems.includes(issue.id)}
              onCheck={handleCheckIssue}
            />
          ))
        ) : (
          <IssueEmptyItem />
        ))}
    </ul>
  );
};

export default IssueTable;

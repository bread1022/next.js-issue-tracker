'use client';

import useSWR from 'swr';
import { IssueType } from '@/app/model/issue';
import IssueItem from './IssueItem/IssueItem';
import Skeletone from '@/components/Common/Skeletone';
import IssueEmptyItem from './IssueItem/IssueEmptyItem';
import { useIssueFilterState } from '@/context/IssueFilterContext';
import { createQuery } from '@/service/filter';
import {
  useIssueCheckDispatch,
  useIssueCheckState,
} from '@/context/IssueCheckContext';
import { useEffect } from 'react';

const IssueTable = () => {
  const filterState = useIssueFilterState();
  const { checkedAll, checkeditems } = useIssueCheckState();
  const { onCheckAllIn, onCheck } = useIssueCheckDispatch();
  const query = createQuery(filterState);

  const { data: issues, isLoading } = useSWR<IssueType[]>(
    `/api/issues?${query}`,
  );

  const handleCheckIssue = (id: string) => onCheck(id);

  useEffect(() => {
    if (!checkedAll) return;
    const checkeditems = issues?.map((issue) => issue.id) || [];
    onCheckAllIn(checkeditems);
  }, [checkedAll, issues, onCheckAllIn]);

  // TODO: 페이지 네이션 !!!
  return (
    <ul>
      {isLoading ? (
        <Skeletone type="list" />
      ) : !!issues?.length ? (
        issues &&
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
      )}
    </ul>
  );
};

export default IssueTable;

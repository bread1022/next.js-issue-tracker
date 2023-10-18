'use client';

import useSWR from 'swr';
import { IssueType } from '@/app/model/issue';
import IssueItem from './IssueItem/IssueItem';
import Skeletone from '@/components/Common/Skeletone';
import IssueEmptyItem from './IssueItem/IssueEmptyItem';
import { useIssueFilterState } from '@/context/IssueFilterContext';
import { createQuery } from '@/service/filter';

// TODO: checkBox 상태관리는 여기서
const IssueTable = () => {
  const filterState = useIssueFilterState();
  const query = createQuery(filterState);

  const { data: issues, isLoading } = useSWR<IssueType[]>(
    `/api/issues?${query}`,
  );

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
            checked={false}
            onCheck={() => console.log('아이템 id 선택 -> Checked')}
          />
        ))
      ) : (
        <IssueEmptyItem />
      )}
    </ul>
  );
};

export default IssueTable;

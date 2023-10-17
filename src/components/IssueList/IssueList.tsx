import LabelBtn from './LinkBtns/LabelBtn';
import NewIssueBtn from './LinkBtns/NewIssueBtn';
import FilterBar from './FilterBar';
import IssueTable from './IssueTable';
import { getIssueCount } from '@/service/issues';

const IssueList = async () => {
  const countInfo = await getIssueCount();

  return (
    <>
      <div className="flex justify-between">
        <FilterBar />
        <div className="h-full flex gap-3">
          <LabelBtn count={countInfo.label} />
          <NewIssueBtn />
        </div>
      </div>
      <IssueTable issueCount={countInfo.issue} />
    </>
  );
};

export default IssueList;

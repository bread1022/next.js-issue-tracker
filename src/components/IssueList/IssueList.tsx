import LabelBtn from './LinkBtns/LabelBtn';
import NewIssueBtn from './LinkBtns/NewIssueBtn';
import FilterBar from './FilterBar';
import IssueTable from './IssueTable';

const IssueList = () => {
  //TODO: filter State 관리

  //TODO: count 데이터 패치 (labelBtn, issueTable로 전달)

  return (
    <section className="p-5">
      <div className="flex justify-between">
        <FilterBar />
        <div className="h-full flex gap-3">
          <LabelBtn />
          <NewIssueBtn />
        </div>
      </div>
      <IssueTable />
    </section>
  );
};

export default IssueList;

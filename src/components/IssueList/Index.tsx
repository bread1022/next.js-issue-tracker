import LabelBtn from './LabelBtn';
import NewIssueBtn from './NewIssueBtn';
import FilterBar from './filterBar';
import TableList from './issueTable/TableList';

export default function IssueList() {
  // filter State 관리

  // count 데이터 패치

  return (
    <section className="p-5">
      <div className="flex justify-between">
        <FilterBar />
        <div className="h-full flex gap-3">
          <LabelBtn />
          <NewIssueBtn />
        </div>
      </div>
      <TableList />
    </section>
  );
}

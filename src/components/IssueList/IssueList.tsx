import IssueTable from './IssueTable';
import TableHeader from './IssueTable/TableHeader';
import { IssueCountType } from './IssueTable/TableHeader/TableStatusBtns';

const IssueList = async (props: IssueCountType) => {
  return (
    <div className="rounded-lg border border-border">
      <TableHeader issueCount={props} />
      <IssueTable />
    </div>
  );
};

export default IssueList;

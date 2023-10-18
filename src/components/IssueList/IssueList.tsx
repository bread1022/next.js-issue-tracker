import IssueTable from './IssueTable';
import TableHeader from './TableHeader';
import { IssueCountType } from './TableHeader/TableStatusBtns';

const IssueList = async (props: IssueCountType) => {
  return (
    <div className="rounded-lg border border-border">
      <TableHeader issueCount={props} />
      <IssueTable />
    </div>
  );
};

export default IssueList;

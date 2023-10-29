import IssueCheckProvider from '@/context/IssueCheckContext';
import IssueTable from './IssueTable/IssueTable';
import TableHeader from './TableHeader/TableHeader';
import { IssueCountType } from './TableHeader/TableStatusBtns';

const IssueList = (props: IssueCountType) => {
  return (
    <div className="rounded-lg border border-border">
      <IssueCheckProvider>
        <TableHeader issueCount={props} />
        <IssueTable />
      </IssueCheckProvider>
    </div>
  );
};

export default IssueList;

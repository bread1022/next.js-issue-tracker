import IssueCheckProvider from '@/context/IssueCheckContext';
import IssueTable from './IssueTable';
import TableHeader from './TableHeader';
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

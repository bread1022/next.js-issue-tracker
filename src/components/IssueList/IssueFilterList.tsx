import FilterBar from '@/components/IssueList/FilterBar/FilterBar';
import IssueList from '@/components/IssueList/IssueList';
import LabelBtn from '@/components/IssueList/LinkBtns/LabelBtn';
import NewIssueBtn from '@/components/IssueList/LinkBtns/NewIssueBtn';
import { IssueCountType } from './TableHeader/TableStatusBtns';
import IssueFilterProvider from '@/context/IssueFilterContext';

interface IssueFilterListProps {
  countInfo: {
    issue: IssueCountType;
    label: number;
  };
}

const IssueFilterList = ({ countInfo }: IssueFilterListProps) => {
  return (
    <IssueFilterProvider>
      <section className="px-5">
        <div className="flex justify-between">
          <FilterBar />
          <div className="h-full flex gap-3">
            <LabelBtn count={countInfo.label} />
            <NewIssueBtn />
          </div>
        </div>
        <IssueList {...countInfo.issue} />
      </section>
    </IssueFilterProvider>
  );
};

export default IssueFilterList;

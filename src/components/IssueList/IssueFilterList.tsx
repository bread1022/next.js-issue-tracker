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
        <div className="h-max flex flex-col web:flex-row gap-3">
          <div className="h-max flex gap-3 web:order-1">
            <LabelBtn count={countInfo.label} />
            <NewIssueBtn />
          </div>
          <FilterBar />
        </div>
        <IssueList {...countInfo.issue} />
      </section>
    </IssueFilterProvider>
  );
};

export default IssueFilterList;

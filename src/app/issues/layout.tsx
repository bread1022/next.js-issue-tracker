import { ReactNode } from 'react';
import IssueFilterProvider from '@/context/IssueFilterContext';

interface IssueListPageLayoutProps {
  children: ReactNode;
}

const IssueListPageLayout = ({ children }: IssueListPageLayoutProps) => {
  return (
    <IssueFilterProvider>
      <section className="p-5">{children}</section>;
    </IssueFilterProvider>
  );
};

export default IssueListPageLayout;

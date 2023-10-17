import { ReactNode } from 'react';

interface IssueDetaillayoutProps {
  children: ReactNode;
}

const IssueDetaillayout = ({ children }: IssueDetaillayoutProps) => {
  return <section>{children}</section>;
};

export default IssueDetaillayout;

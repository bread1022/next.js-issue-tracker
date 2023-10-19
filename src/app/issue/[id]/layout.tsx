import { ReactNode } from 'react';

interface IssueDetaillayoutProps {
  children: ReactNode;
}

const IssueDetaillayout = ({ children }: IssueDetaillayoutProps) => {
  return <section className="px-5">{children}</section>;
};

export default IssueDetaillayout;

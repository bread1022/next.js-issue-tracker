'use client';

import useIssueList from '@/hook/issueList';
import IssueForm from './IssueForm/IssueForm';

const NewIssueForm = () => {
  const { postIssue } = useIssueList();

  return (
    <>
      <IssueForm onPost={postIssue} />
    </>
  );
};

export default NewIssueForm;

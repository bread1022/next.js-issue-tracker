import { IssueType, SimpleLabel, SimpleUser } from '@/app/model/issue';
import { SideBarItem } from '@/components/New/SideBar';
import { useIssueFilterState } from '@/context/IssueFilterContext';
import { convertFromSideBarItem, createQuery } from '@/service/filter';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import useSWR from 'swr';

export interface AddIssueProps {
  user?: {
    userId: string;
    userImage: string;
  };
  title: string;
  comment: string;
  assignees: SideBarItem[];
  labels: SideBarItem[];
}

const deleteIssue = (id: string) =>
  axios.delete(`/api/issues/${id}`).then((res) => res.data);

const addIssue = ({ title, comment, assignees, labels }: AddIssueProps) =>
  axios
    .post('/api/issue', {
      title,
      contents: comment,
      assignees: assignees.map((assignee) => assignee.id),
      labels: labels.map((label) => label.id),
    })
    .then((res) => res.data);

const switchStatusOfIssue = (items: string[], isOpen: boolean) =>
  axios
    .put('/api/issues', {
      isOpen: isOpen,
      issues: items,
    })
    .then((res) => res.data);

//TODO: OptimisticData가 제대로 적용이 안됨
export default function useIssueList() {
  const { data: session } = useSession();
  const user = session?.user;

  const filterState = useIssueFilterState();
  const query = createQuery(filterState);

  const { data, isLoading, error, mutate } = useSWR<IssueType[]>(
    `/api/issues?${query}`,
  );

  const deleteIssueBy = useCallback(
    async (id: string) => {
      if (!data) return;
      const newIssues = data?.filter((issue) => issue.id !== id);

      return mutate(deleteIssue(id), {
        optimisticData: newIssues,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [data, mutate],
  );

  const postIssue = useCallback(
    async ({ title, comment, assignees, labels }: AddIssueProps) => {
      if (!data || !user) return;
      const newIssue: IssueType = {
        id: (data.length + 1).toString(),
        title,
        isOpen: true,
        assignees: convertFromSideBarItem(
          'assignees',
          assignees,
        ) as SimpleUser[],
        labels: convertFromSideBarItem('labels', labels) as SimpleLabel[],
        author: {
          id: user.userId,
          userId: user.userId,
          userImage: user.userImage,
        },
        createdAt: new Date().toISOString(),
      };
      const newIssues = [...data, newIssue];

      return mutate(addIssue({ title, comment, assignees, labels }), {
        optimisticData: newIssues,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [data, mutate],
  );

  const putIsOpenOfIssue = useCallback(
    async (items: string[], isOpen: boolean) => {
      if (!data) return;
      const newIssues = data?.map((issue) => {
        return items.includes(issue.id) ? { ...issue, isOpen: isOpen } : issue;
      });

      return mutate(switchStatusOfIssue(items, isOpen), {
        optimisticData: newIssues,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [data, mutate],
  );

  return {
    data,
    isLoading,
    error,
    deleteIssueBy,
    postIssue,
    putIsOpenOfIssue,
  };
}
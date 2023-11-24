import { IssueType, SimpleLabel, SimpleUser } from '@/model/issue';
import { SideBarItem } from '@/components/New/SideBar';
import { convertFromSideBarItem, createQuery } from '@/service/filter';
import axios from 'axios';
import useSWR from 'swr';
import { FilterState, useIssueFilterState } from '@/context/IssueFilterContext';

export interface PostIssueProps {
  user: {
    userId: string;
    userImage: string;
  };
  title: string;
  comment: string;
  assignees: SideBarItem[];
  labels: SideBarItem[];
}

type AddIssueProps = Omit<PostIssueProps, 'user'>;

const deleteIssue = async (id: string) => {
  return axios.delete(`/api/issues/${id}`).then((res) => res.data);
};

const addIssue = async ({
  title,
  comment,
  assignees,
  labels,
}: AddIssueProps) => {
  return axios
    .post('/api/issue', {
      title,
      contents: comment,
      assignees: assignees.map((assignee) => assignee.id),
      labels: labels.map((label) => label.id),
    })
    .then((res) => res.data);
};

const switchStatusOfIssue = async (items: string[], isOpen: boolean) => {
  return axios
    .put('/api/issues', {
      isOpen: isOpen,
      issues: items,
    })
    .then((res) => res.data);
};

export default function useIssueList() {
  const filterState = useIssueFilterState();
  const query = createQuery(filterState);
  const { data, isLoading, error, mutate } = useSWR<IssueType[]>([
    `/api/issues?${query}`,
  ]);

  const deleteIssueBy = (id: string) => {
    const newIssues = data?.filter((issue) => issue.id !== id);
    return mutate(deleteIssue(id), {
      optimisticData: newIssues,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  const postIssue = ({
    user,
    title,
    comment,
    assignees,
    labels,
  }: PostIssueProps) => {
    const newIssue: IssueType = {
      id: (data?.length ?? 0 + 1).toString(),
      title,
      isOpen: true,
      assignees: convertFromSideBarItem('assignees', assignees) as SimpleUser[],
      labels: convertFromSideBarItem('labels', labels) as SimpleLabel[],
      author: {
        id: user.userId,
        userId: user.userId,
        userImage: user.userImage,
      },
      createdAt: new Date().toISOString(),
    };
    const newIssues = [newIssue, ...(data ?? [])];

    return mutate(addIssue({ title, comment, assignees, labels }), {
      optimisticData: newIssues,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  const putIsOpenOfIssue = (items: string[], isOpen: boolean) => {
    const newIssues = data?.map((issue) => {
      return items.includes(issue.id) ? { ...issue, isOpen: isOpen } : issue;
    });

    return mutate(switchStatusOfIssue(items, isOpen), {
      optimisticData: newIssues,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return {
    data,
    isLoading,
    error,
    deleteIssueBy,
    postIssue,
    putIsOpenOfIssue,
  };
}

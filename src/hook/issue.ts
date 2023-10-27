import { Comment } from '@/app/model/issue';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';

const addComment = async (issueId: string, comment: string) => {
  return axios
    .put('/api/issue', {
      id: issueId,
      comment: comment,
    })
    .then((res) => res.data);
};

const editTitle = async (issueId: string, title: string) => {
  return axios
    .put('/api/issue', {
      id: issueId,
      title: title,
    })
    .then((res) => res.data);
};

const editIsOpen = async (issueId: string, isOpen: boolean) => {
  return axios
    .put('/api/issue', {
      id: issueId,
      isOpen: isOpen,
    })
    .then((res) => res.data);
};

export default function useIssue(issueId: string) {
  const { data, isLoading, error, mutate } = useSWR(`/api/issues/${issueId}`);

  const putComment = async (comment: Comment) => {
    const newComment = {
      ...data,
      comments: [
        ...(data.comments ?? []),
        {
          ...comment,
          createdAt: new Date().toISOString(),
          isMine: true,
        },
      ],
    };

    return mutate(addComment(issueId, comment.comment), {
      optimisticData: newComment,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  const putTitle = async (title: string) => {
    const newTitle = {
      ...data,
      title: title,
    };

    return mutate(editTitle(issueId, title), {
      optimisticData: newTitle,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  const putIsOpen = async ({ isOpen }: { isOpen: boolean }) => {
    const newIsOpen = {
      ...data,
      isOpen: isOpen,
    };

    return mutate(editIsOpen(issueId, isOpen), {
      optimisticData: newIsOpen,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { data, isLoading, error, putComment, putTitle, putIsOpen };
}

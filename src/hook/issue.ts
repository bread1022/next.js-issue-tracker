import { SimpleComment } from '@/app/model/issue';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import useSWR from 'swr';

const addComment = async (id: string, comment: string) => {
  return axios
    .put(`/api/issues/${id}/comments`, {
      comment: comment,
    })
    .then((res) => res.data);
};

const editComment = async (id: string, commentId: string, comment: string) => {
  return axios
    .put(`/api/issues/${id}/comments`, {
      commentId: commentId,
      comment: comment,
    })
    .then((res) => res.data);
};

const editTitle = async (id: string, title: string) => {
  return axios
    .put(`/api/issues/${id}`, {
      title: title,
    })
    .then((res) => res.data);
};

const editIsOpen = async (id: string, isOpen: boolean) => {
  return axios
    .put(`/api/issues/${id}`, {
      isOpen: isOpen,
    })
    .then((res) => res.data);
};

export default function useIssue(issueId: string) {
  const { data: user } = useSession();
  const { data, isLoading, error, mutate } = useSWR(`/api/issues/${issueId}`);

  const putTitle = useCallback(
    async (title: string) => {
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
    },
    [data, mutate],
  );

  const putIsOpen = useCallback(
    async ({ isOpen }: { isOpen: boolean }) => {
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
    },
    [data, mutate],
  );

  const putNewComment = useCallback(
    async (comment: string) => {
      if (!user) return;
      const newComment = {
        ...data,
        comments: [
          ...(data.comments ?? []),
          {
            authorId: user.user.userId,
            authorImage: user.user.userImage,
            comment: comment,
            createdAt: new Date().toISOString(),
            isMine: true,
          },
        ],
        commentsCount: (data.commentsCount ?? 0) + 1,
      };

      return mutate(addComment(issueId, comment), {
        optimisticData: newComment,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [data, mutate],
  );

  const putEditComment = useCallback(
    async (commentId: string, comment: string) => {
      if (!user) return;
      const index = data.comments.findIndex(
        (comment: SimpleComment) => comment.commentId === commentId,
      );

      const newComment = {
        ...data,
        comments: [
          data.comments[index],
          {
            comment: comment,
            authorId: user.user.userId,
            authorImage: user.user.userImage,
          },
          ...data.comments.slice(index + 1),
        ],
      };

      return mutate(editComment(issueId, commentId, comment), {
        optimisticData: newComment,
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
    putTitle,
    putIsOpen,
    putNewComment,
    putEditComment,
  };
}

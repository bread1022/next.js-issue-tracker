import { SimpleComment } from '@/app/model/issue';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import useSWR from 'swr';

const addComment = (id: string, comment: string) =>
  axios
    .put(`/api/issues/${id}/comments`, {
      comment: comment,
    })
    .then((res) => res.data);

const editComment = (id: string, commentId: string, comment: string) =>
  axios
    .put(`/api/issues/${id}/comments`, {
      commentId: commentId,
      comment: comment,
    })
    .then((res) => res.data);

const editTitle = (id: string, title: string) =>
  axios
    .put(`/api/issues/${id}`, {
      title: title,
    })
    .then((res) => res.data);

const editIsOpen = (id: string, isOpen: boolean) =>
  axios
    .put(`/api/issues/${id}`, {
      isOpen: isOpen,
    })
    .then((res) => res.data);

export default function useIssue(issueId: string) {
  const { data: user } = useSession();
  const { data, isLoading, error, mutate } = useSWR(`/api/issues/${issueId}`);

  const putTitle = useCallback(
    async (title: string) => {
      const newIssue = {
        ...data,
        title: title,
      };

      return mutate(editTitle(issueId, title), {
        optimisticData: newIssue,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [data, mutate, issueId],
  );

  const putIsOpen = useCallback(
    async ({ isOpen }: { isOpen: boolean }) => {
      const newIssue = {
        ...data,
        isOpen: isOpen,
        updatedAt: new Date().toISOString(),
      };

      return mutate(editIsOpen(issueId, isOpen), {
        optimisticData: newIssue,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [data, mutate, issueId],
  );

  const putNewComment = useCallback(
    async (comment: string) => {
      if (!user) return;
      const newIssue = {
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
        optimisticData: newIssue,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [data, mutate, issueId, user],
  );

  const putEditComment = useCallback(
    async (commentId: string, comment: string) => {
      if (!user || !data) return;
      const index = data.comments.findIndex(
        (comment: SimpleComment) => comment.commentId === commentId,
      );
      const newComment = {
        comment: comment,
        authorId: user.user.userId,
        authorImage: user.user.userImage,
        updatedAt: new Date().toISOString(),
        isMine: true,
      };

      const newIssue = {
        ...data,
        comments: [
          ...data.comments.slice(0, index),
          newComment,
          ...data.comments.slice(index + 1),
        ],
      };

      return mutate(editComment(issueId, commentId, comment), {
        optimisticData: newIssue,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [data, mutate, issueId, user],
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

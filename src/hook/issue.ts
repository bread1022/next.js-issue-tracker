import { SimpleComment } from '@/app/model/issue';
import axios from 'axios';
import useSWR from 'swr';

const addComment = async (issueId: string, comment: string) => {
  return axios
    .post('/api/issue', {
      id: issueId,
      comment: comment,
    })
    .then((res) => res.data);
};

export default function useIssue(issueId: string) {
  const { data, isLoading, error, mutate } = useSWR(`/api/issues/${issueId}`);

  const postComment = (comment: SimpleComment) => {
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

  return { data, isLoading, error, postComment };
}

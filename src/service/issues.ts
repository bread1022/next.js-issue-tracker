import { FilterState } from '@/context/IssueFilterContext';
import { client } from './sanity';

export async function getFilterdIssueList(filters: FilterState) {
  const query = buildFilterQuery(filters);
  return client.fetch(query);
}

const buildFilterQuery = ({
  isOpen,
  author,
  labels,
  assignee,
  comment,
}: FilterState) => {
  const query = `*[_type == "issue"${
    isOpen === null ? '' : `&& isOpen == ${isOpen}`
  }${author ? `&& author->userId == "${author}"` : ''}${
    labels.length > 0
      ? `&& labels[]->labelName match ["${labels[0]}"${
          labels[1] ? `, "${labels[1]}"` : ''
        }]`
      : ''
  }${assignee ? `&& "${assignee}" in assignees[]->userId` : ''}${
    comment ? `&& "${comment}" in comments[].author->userId` : ''
  }] | order(_createdAt desc){${issueFields}}`;
  return query;
};

const issueFields = `
  "id": _id,
  "title": title,
  "isOpen": isOpen,
  "author": author->{userId, "userImage": userImage},
  "labels": labels[]->{labelName, backgroundColor, fontColor},
  "assignees": assignees[]->{userId, "userImage": userImage},
  "createdAt": _createdAt,
`;

export async function getIssueCount() {
  return client.fetch(`{
    "label": count(*[_type == "label"]),
    "issue" : {
      "openCount": count(*[_type == "issue" && isOpen == true]),
      "closeCount": count(*[_type == "issue" && isOpen == false]),
    }
  }
  `);
}

type IssueById = {
  id: string;
  username?: string;
};

export async function getIssueById({ id, username }: IssueById) {
  return client
    .fetch(
      `*[_type == "issue" && _id == "${id}"][0]{
  "id": _id,
  "title": title,
  "isOpen": isOpen,
  "authorId": author->userId,
  "authorImage": author->userImage,
  "authorName": author->name,
  "mainComment": contents,
  "labels": labels[]->{labelName, backgroundColor, fontColor},
  "assignees": assignees[]->{userId, "userImage": userImage},
  "comments" : comments[]{"commentId":_key, comment, "authorId": author->userId, "authorImage": author->userImage, "createdAt": createdAt, "updatedAt": updatedAt, "isMine": author->name == "${username}"} | order(_createdAt asc),
  "createdAt": _createdAt,
  "updatedAt": _updatedAt,
  "isMine": "${username}" in assignees[]->name || author->name == "${username}"
}`,
    )
    .then((data) => {
      const {
        authorId,
        authorImage,
        authorName,
        mainComment,
        comments,
        ...rest
      } = data;
      const newComments = [
        {
          authorId,
          authorImage,
          comment: mainComment,
          createdAt: rest.createdAt,
          updatedAt: rest.updatedAt,
          isMine: authorName === username,
        },
        ...(comments || []),
      ];
      return {
        ...rest,
        authorId,
        comments: newComments,
        commentsCount: newComments.length,
      };
    });
}

export async function addComment(
  issueId: string,
  userId: string,
  comment: string,
) {
  return client
    .patch(issueId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        _type: 'comment',
        author: {
          _ref: userId,
          _type: 'reference',
        },
        comment: comment,
        createdAt: new Date().toISOString(),
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function editTitle(issueId: string, title: string) {
  return client
    .patch(issueId)
    .set({ title: title })
    .commit({ autoGenerateArrayKeys: true });
}

export async function editIsOpen(issueId: string, isOpen: boolean) {
  return client
    .patch(issueId)
    .set({ isOpen: isOpen })
    .commit({ autoGenerateArrayKeys: true });
}

export async function editComment(
  issueId: string,
  userId: string,
  commentId: string,
  comment: string,
) {
  return client
    .patch(issueId)
    .setIfMissing({ comments: [] })
    .insert('replace', `comments[_key == "${commentId}"]`, [
      {
        _type: 'comment',
        author: {
          _ref: userId,
          _type: 'reference',
        },
        comment: comment,
        updatedAt: new Date().toISOString(),
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

import { client } from './sanity';

export async function getIssueList() {
  return client.fetch(
    `*[_type == "issue"] | order(_createdAt desc){${issueFields}}`,
  );
}

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
  "comments" : commentsBy[]{comment, "authorId": author->userId, "authorImage": author->userImage, "createdAt": createdAt, "updatedAt": updatedAt, "isMine": author->name == "${username}"} | order(_createdAt asc),
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
    .setIfMissing({ commentsBy: [] })
    .append('commentsBy', [
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

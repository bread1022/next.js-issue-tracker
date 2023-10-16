import { client } from './sanity';

export async function getIssues() {
  return client.fetch(
    `*[_type == "issue"] | order(_createdAt desc){${issueFields}}`,
  );
}

export async function getIssueCount() {
  return client.fetch(`{
    "openCount": count(*[_type == "issue" && isOpen == true]),
    "closeCount": count(*[_type == "issue" && isOpen == false]),
    "labelCount": count(*[_type == "label"]),
  }
  `);
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
  "comments" : commentsBy[]{comment, "authorId": author->userId, "authorImage": author->userImage, "createdAt": _createdAt, "updatedAt": _updatedAt, "isMine": author->name == "${username}"} | order(_createdAt asc),
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

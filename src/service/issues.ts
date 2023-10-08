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

/**
{
  "openCount": count(*[_type == "issue" && isOpen == true]),
  "closeCount": count(*[_type == "issue" && isOpen == false]),
  "labelCount": count(*[_type == "label"]),
}
 */

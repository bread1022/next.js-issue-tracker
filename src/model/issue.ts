import { Label } from './label';
import { User } from './user';

export type SimpleUser = Omit<User, 'name'>;
export type SimpleLabel = Omit<Label, 'createdAt'>;

export interface IssueType {
  id: string;
  title: string;
  isOpen: boolean;
  assignees: SimpleUser[];
  labels: SimpleLabel[];
  author: SimpleUser;
  createdAt: string;
}

export type Comment = Omit<SimpleComment, 'commentId'>;
export interface SimpleComment {
  commentId: string;
  authorId: string;
  authorImage: string;
  comment: string;
}
export interface CommentType extends SimpleComment {
  createdAt: string;
  updatedAt?: string;
  isMine: boolean;
}

export interface DetailIssueType {
  id: number;
  title: string;
  isOpen: boolean;
  authorId: string;
  comments: CommentType[];
  assignees: SimpleUser[];
  labels: SimpleLabel[];
  updatedAt: string;
}

export interface IssueData extends DetailIssueType {
  authorImage: string;
  authorName: string;
  isMine: boolean;
  mainComment: string;
}

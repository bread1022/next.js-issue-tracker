import { Label } from './label';
import { User } from './user';

type SimpleUser = Omit<User, 'name'>;
type SimpleLabel = Omit<Label, 'createdAt'>;

export interface IssueType {
  id: string;
  title: string;
  isOpen: boolean;
  assignees: SimpleUser[];
  labels: SimpleLabel[];
  author: SimpleUser;
  createdAt: string;
}

export interface SimpleComment {
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

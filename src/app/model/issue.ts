import { Label } from './label';
import { User } from './user';

type SimpleUser = Omit<User, 'name'>;
type SimpleLabel = Omit<Label, 'createdAt'>;

export interface IssueType {
  id: number;
  title: string;
  isOpen: boolean;
  assignees: SimpleUser[];
  labels: SimpleLabel[];
  author: SimpleUser;
  createdAt: string;
}

export interface CommentType {
  authorId: string;
  authorImage: string;
  comment: string;
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

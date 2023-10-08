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

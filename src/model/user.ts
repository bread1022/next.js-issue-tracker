export interface OAuthUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  userImage?: string;
}

export type User = Omit<OAuthUser, 'email'>;

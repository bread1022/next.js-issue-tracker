import { OAuthUser } from '@/service/users';

export type User = Omit<OAuthUser, 'email'>;

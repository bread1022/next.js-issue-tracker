import { client } from './sanity';

export interface OAuthUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export async function addUser({
  id,
  userId,
  name,
  email,
  avatarUrl,
}: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    userId,
    name,
    email,
    avatarUrl,
  });
}

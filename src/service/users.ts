import { client } from './sanity';

export interface OAuthUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  userImage?: string;
}

export async function addUser({
  id,
  userId,
  name,
  email,
  userImage,
}: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    userId,
    name,
    email,
    userImage,
  });
}

export async function getUsers() {
  return client.fetch(`*[_type == "user"] | order(userId desc) {
    "id": _id,
    userId,
    name,
    userImage,
  }`);
}

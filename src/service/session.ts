import { getServerSession } from 'next-auth';
import { cache } from 'react';
import { authOptions } from '@/lib/authOptions';

import 'server-only';
import { OAuthUser } from '@/model/user';

export const getUser = cache(async () => {
  const session = await getServerSession(authOptions);
  const user: OAuthUser = session?.user;
  return { user };
});

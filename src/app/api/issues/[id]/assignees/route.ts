import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { getAssigneesOfIssue } from '@/service/issues';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params: { id } }: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  const username = user.name;

  return getAssigneesOfIssue({ id, username }).then(NextResponse.json);
}

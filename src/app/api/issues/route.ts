import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { getIssueList } from '@/service/issues';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  return getIssueList().then(NextResponse.json);
}

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { createIssue, Issue } from '@/service/issues';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  const issue: Issue = await request.json();

  if (!issue) {
    return new Response('Bad request. 이슈 정보가 없습니다.', { status: 400 });
  }

  return createIssue({
    ...issue,
    userId: user.id,
  }).then(NextResponse.json);
}

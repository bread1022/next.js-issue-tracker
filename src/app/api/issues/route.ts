import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { getFilterdIssueList } from '@/service/issues';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  const {
    nextUrl: { searchParams },
  } = request;

  if (!searchParams) {
    return new Response('Bad request. 유효하지 않은 요청입니다.', {
      status: 400,
    });
  }

  return getFilterdIssueList({
    isOpen: searchParams.get('isOpen') === 'true' ? true : false,
    author: searchParams.get('author'),
    labels: searchParams.get('labels')?.split(',') || [],
    assignee: searchParams.get('assignee'),
    comment: searchParams.get('comment'),
  }).then(NextResponse.json);
}

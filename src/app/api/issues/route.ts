import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { getFilterdIssueList } from '@/service/issues';
import { User } from '@/app/model/user';

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

  const queryParams = getQueryParams(searchParams, user);

  return getFilterdIssueList(queryParams).then(NextResponse.json);
}

const getQueryParams = (searchParams: URLSearchParams, user: User) => {
  return {
    isOpen:
      searchParams.get('isOpen') === 'true'
        ? true
        : searchParams.get('isOpen') === 'false'
        ? false
        : null,
    author:
      searchParams.get('author') === 'me'
        ? user.userId
        : searchParams.get('author'),
    labels: searchParams.get('labels')?.split(',') || [],
    assignee:
      searchParams.get('assignee') === 'me'
        ? user.userId
        : searchParams.get('assignee'),
    comment:
      searchParams.get('comment') === 'me'
        ? user.userId
        : searchParams.get('comment'),
  };
};

import { NextRequest, NextResponse } from 'next/server';
import { editAllIsOpen, getFilterdIssueList } from '@/service/issues';
import { User } from '@/model/user';
import { getUser } from '@/service/session';

export async function GET(request: NextRequest) {
  const { user } = await getUser();

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
  const extractParams = (value: string | null) => {
    return value === 'me' ? user.userId : value;
  };

  return {
    isOpen:
      searchParams.get('isOpen') === 'true'
        ? true
        : searchParams.get('isOpen') === 'false'
        ? false
        : null,
    author: extractParams(searchParams.get('author')),
    labels: searchParams.get('labels')?.split(',') || [],
    assignee: extractParams(searchParams.get('assignee')),
    comment: extractParams(searchParams.get('comment')),
  };
};

export async function PUT(request: NextRequest) {
  const { user } = await getUser();

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  const { issues, isOpen } = await request.json();

  if (!issues || isOpen === undefined) {
    return new Response('Bad request. 이슈 아이디가 없습니다.', {
      status: 400,
    });
  }

  return editAllIsOpen(issues, isOpen).then(NextResponse.json);
}

import { NextRequest, NextResponse } from 'next/server';
import {
  editTitle,
  editIsOpen,
  deleteIssue,
  getIssueById,
} from '@/service/issues';
import { getUser } from '@/service/session';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, { params: { id } }: Context) {
  const { user } = await getUser();

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  const username = user.name;
  return getIssueById({ id, username }).then(NextResponse.json);
}

export async function DELETE(_: NextRequest, { params: { id } }: Context) {
  const { user } = await getUser();

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  return deleteIssue(id).then(NextResponse.json);
}

export async function PUT(request: NextRequest, { params: { id } }: Context) {
  const { user } = await getUser();

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  try {
    const { title, isOpen } = await request.json();

    let response;
    if (title) {
      response = await handleTitle(id, title);
    } else if (isOpen !== undefined) {
      response = await handleIsOpen(id, isOpen);
    } else {
      return new Response('유효한 데이터가 없습니다.', { status: 400 });
    }
    return response;
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
}

const handleTitle = async (id: string, title: string) => {
  return editTitle(id, title).then(NextResponse.json);
};

const handleIsOpen = async (id: string, isOpen: boolean) => {
  return editIsOpen(id, isOpen).then(NextResponse.json);
};

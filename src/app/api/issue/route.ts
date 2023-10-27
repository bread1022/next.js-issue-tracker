import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { addComment, editTitle, editIsOpen } from '@/service/issues';

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  try {
    const { id, comment, title, isOpen } = await request.json();

    if (!id) {
      return new Response('Bad request. 이슈 아이디가 없습니다.', {
        status: 400,
      });
    }

    let response;
    if (comment) {
      response = await handleComment(id, user.id, comment);
    } else if (title) {
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

const handleComment = async (id: string, userId: string, comment: string) => {
  return addComment(id, userId, comment).then(NextResponse.json);
};

const handleTitle = async (id: string, title: string) => {
  return editTitle(id, title).then(NextResponse.json);
};

const handleIsOpen = async (id: string, isOpen: boolean) => {
  return editIsOpen(id, isOpen).then(NextResponse.json);
};
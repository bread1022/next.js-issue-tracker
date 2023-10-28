import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { addComment, editComment } from '@/service/issues';

type Context = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, { params: { id } }: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  const { comment, commentId } = await request.json();

  if (commentId) {
    return handleEditComment(id, user.id, commentId, comment);
  }
  return handleAddComment(id, user.id, comment);
}

const handleAddComment = async (
  id: string,
  userId: string,
  comment: string,
) => {
  return addComment(id, userId, comment).then(NextResponse.json);
};

const handleEditComment = async (
  id: string,
  userId: string,
  commentId: string,
  comment: string,
) => {
  return editComment(id, userId, commentId, comment).then(NextResponse.json);
};

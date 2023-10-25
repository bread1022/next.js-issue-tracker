import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { addIssue } from '@/service/issues';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  const { id, comment } = await request.json();

  if (!id || comment === undefined) {
    return new Response('Bad request. Comment 상세 내용이 없습니다.', {
      status: 400,
    });
  }

  return addIssue(id, user.id, comment)
    .then(NextResponse.json)
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}

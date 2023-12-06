import { NextResponse } from 'next/server';
import { getLabels } from '@/service/labels';
import { getUser } from '@/service/session';

export async function GET() {
  const { user } = await getUser();

  if (!user) {
    return new Response('인증 오류 (Authentication Error)', { status: 401 });
  }

  return getLabels().then(NextResponse.json);
}

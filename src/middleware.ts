import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  });

  if (!token) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse('Authentication Error', { status: 401 });
    }

    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/signin`, origin);
    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`,
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/new',
    '/',
    '/issue/:path*',
    '/api/issue',
    '/api/issues/:path*',
    '/api/label',
    '/api/user',
  ],
};

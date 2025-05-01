import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Manage route protection
  if (path.startsWith('/admin')) {
    // Exclude login page from protection
    if (path === '/admin/login') {
      return NextResponse.next();
    }

    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If no session and trying to access protected route
    if (!session) {
      const url = new URL('/admin/login', req.url);
      url.searchParams.set('callbackUrl', encodeURI(req.url));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

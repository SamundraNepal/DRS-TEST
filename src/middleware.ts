import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/admin/homepage'];
const loginRoute = '/log-in-sign-up';
const adminHome = '/admin/homepage';

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const token = req.cookies.get('auth_code')?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  let isAuthenticated = false;

  // ✅ Verify JWT
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      if (payload.userID && payload.email) {
        isAuthenticated = true;
      }
    } catch (error: any) {
      isAuthenticated = false;
    }
  }

  // 🚫 Allow logout API without redirect
  if (path === '/api/logout') {
    return NextResponse.next();
  }

  // 🔹 Redirect unauthenticated users to login
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL(loginRoute, req.url));
  }

  // 🔹 Redirect authenticated users away from login/signup pages
  if (isAuthenticated && path === loginRoute) {
    return NextResponse.redirect(new URL(adminHome, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

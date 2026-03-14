import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname } = request.nextUrl

  // Public paths that don't require authentication
  const publicPaths = ['/auth/login', '/auth/register', '/auth/forgot-password', '/']

  // Check if path is public
  const isPublicPath = publicPaths.includes(pathname) || pathname.startsWith('/auth')

  if (isPublicPath && session) {
    // Redirect authenticated users away from auth pages
    if (pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  if (!isPublicPath && !session) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}

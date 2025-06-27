import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/';
    //now extract the token from the cookies chileee
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) 
        return NextResponse.redirect(new URL('/', request.nextUrl))

    if (!isPublicPath && !token) 
        return NextResponse.redirect(new URL('/login', request.nextUrl))

//   return NextResponse.redirect(new URL('/home', request.url))
}
 
export const config = {
  matcher: ['/',
    '/profile/:path*',
    '/login'
  ]
}
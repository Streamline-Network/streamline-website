import authCheck, { NextRequestWithAuth } from 'next-auth/middleware'

export function middleware(request: NextRequestWithAuth) {
  if (request.nextUrl.pathname.startsWith('/account')) {
    return authCheck(request)
  }
}

import { JWT, getToken } from 'next-auth/jwt'

import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { STEPS } from './pages/account/apply/[step]'

const redirectToStep = async (applicationStage: number, req: NextRequest, token: JWT) => {
  for (const step of Object.keys(STEPS)) {
    if (STEPS[step] === applicationStage) {
      const newPathname = `/account/apply/${step}`

      if (req.nextUrl.pathname === newPathname) return

      const url = new URL(newPathname, req.nextUrl.origin)
      return NextResponse.redirect(url)
    }
  }
}

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/account')) {
    const token = await getToken({ req, secret: process.env.SECRET })

    if (!token) {
      return NextResponse.redirect(
        new URL(`/api/auth/signin?callbackUrl=${req.url}`, req.nextUrl.origin)
      )
    }

    if (req.nextUrl.pathname.startsWith('/account/apply')) {
      return redirectToStep(token.applicationStage, req, token)
    }
  }
}

export const config = {
  matcher: '/account/:path*',
}

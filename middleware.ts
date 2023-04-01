import { JWT, getToken } from 'next-auth/jwt'

import Jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { STEPS } from './pages/account/apply/[step]'

const redirectToStep = async (applicationStage: number, req: NextRequest) => {
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
      return redirectToStep(token.applicationStage, req)
    }
  }

  /*   if (req.nextUrl.pathname.startsWith('/api/discord')) {
    const key = process.env.MIDDLEWARE_SECRET

    if (!key) {
      throw new Error('Key expected!')
    }

    const url = new URL(req.nextUrl.pathname, req.nextUrl.origin)

    const verificationKey = req.nextUrl.searchParams.get('verificationKey')

    if (verificationKey) {
      const isVerified = Jwt.verify(verificationKey, key)
      console.log(isVerified)
      NextResponse.redirect(url)
    }

    const redirectUrl = new URL('/api/discord/middleware', req.nextUrl.origin)

    redirectUrl.searchParams.set('callbackUrl', url.href)

    const newVerificationKey = Jwt.sign({ originalUrl: url }, key, { expiresIn: '1s' })

    redirectUrl.searchParams.set('verificationKey', newVerificationKey)

    return NextResponse.redirect(redirectUrl)
  } */
}

export const config = {
  // matcher: ['/account/:path*', '/api/discord'],
  matcher: ['/account/:path*'],
}

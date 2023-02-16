import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { STEPS } from './pages/account/apply/[step]'
import { getToken } from 'next-auth/jwt'

const redirectToStep = (applicationStage: number, req: NextRequest) => {
  for (const step of Object.keys(STEPS)) {
    if (STEPS[step] === applicationStage) {
      const url = new URL(`account/apply/${step}`, req.nextUrl.origin)
      if (req.url === url.href) return
      return url
    }
  }
}

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/account')) {
    const token = await getToken({ req, secret: process.env.SECRET })

    if (!token)
      return NextResponse.redirect(
        new URL(`/api/auth/signin?callbackUrl=${req.url}`, req.nextUrl.origin)
      )

    if (req.nextUrl.pathname.startsWith('/account/apply')) {
      const url = redirectToStep(token.applicationStage, req)

      if (!url) return

      return NextResponse.redirect(url)
    }
  }
}

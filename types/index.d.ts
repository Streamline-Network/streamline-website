import * as NextAuth from 'next-auth'

export type Roles = 'user' | 'reviewer' | 'admin'

declare module 'next-auth' {
  interface Session {
    [key: string]: void
    role: Roles
    applicationStage: 0 | 1 | 2 | 3
    sub: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    [key: string]: void
    role: Roles
    applicationStage: 0 | 1 | 2 | 3
  }
}

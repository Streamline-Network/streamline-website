import * as NextAuth from 'next-auth'

export type Roles = 'user' | 'reviewer' | 'admin'
export type ApplicationStatus = 'denied' | 'accepted' | 'pending' | 'flagged'
export type ApplicationStage = 0 | 1 | 2 | 3

declare module 'next-auth' {
  interface Session {
    [key: string]: void
    role: Roles
    applicationStage: ApplicationStage
    id: string
    email: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    [key: string]: void
    role: Roles
    applicationStage: ApplicationStage
    id: string
  }
}

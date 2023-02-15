import * as NextAuth from 'next-auth'

export type Roles = 'user' | 'reviewer' | 'admin'

declare module 'next-auth' {
  interface Session {
    role: Roles
    applicationStage: 0 | 1 | 2 | 3
  }
}

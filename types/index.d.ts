import * as NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    role: 'user' | 'reviewer' | 'admin'
  }
}

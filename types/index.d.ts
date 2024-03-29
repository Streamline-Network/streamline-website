import * as NextAuth from 'next-auth'
import '@total-typescript/ts-reset/'

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
    user: {
      email: string
      image: string
      name: string
    }
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

export type StreamlinePluginJSON =
  | { action: 'command'; payload: string } // Payload should be valid MC command
  | {
      action: 'whitelist'
      payload: { operation: 'add' | 'remove'; uuid: string } | { operation: 'list' } // List return type
    }

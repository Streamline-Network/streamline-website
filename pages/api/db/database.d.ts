import { FormInfo } from 'components/fragments/blocks/block-types.d'
import { ApplicationStage, Roles } from 'types/index.d'

export declare module Database {
  interface Users {
    email: string
    emailVerified: null
    image: string
    name: string
  }

  interface UserState {
    applicationStage: ApplicationStage
    name: string
    role: Roles
    picture: string
  }

  interface UserIds {
    id: string
    providerAccountId: string
  }

  interface Accounts {
    access_token: string
    expires_at: number
    provider: string
    providerAccountId: string
    refresh_token: string
    scope: string
    token_type: string
    type: string
    userId: string
  }

  module Applications {
    type Apply = {
      submissionDetails: FormInfo
      previousSubmissions?: FormInfo[]

      minecraftUuid: string
      userUuid: string

      state?: ApplyApplicationState
      comments?: Comment[]
      deniedReason?: string

      type: 'apply'
    }
  }
}

export type Comment = {
  senderId: string
  name: string
  senderPicture: string
  time: number
  message?: string
  decision?: ApplyApplicationState
  userAction?: string
}

export type ApplyApplicationState = 'accepted' | 'denied' | 'pending'

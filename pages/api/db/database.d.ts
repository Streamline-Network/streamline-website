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
    type Debug = FormInfo
    type Apply = FormInfo
    //TODO: type Apply = FormInfo & { uuid: string }
  }
}
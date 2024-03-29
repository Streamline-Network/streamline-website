import NextAuth, { AuthOptions } from 'next-auth'
import { copyToSession, loadFromDB } from 'utils/auth/auth'

import DiscordProvider from 'next-auth/providers/discord'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import { db } from 'config/firebase'

const discordProvider = DiscordProvider({
  clientId: process.env.DISCORD_CLIENT_ID || '',
  clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
})

export const authOptions: AuthOptions = {
  providers: [discordProvider],
  adapter: FirestoreAdapter(),
  callbacks: {
    async signIn({ account, user }) {
      await db
        .doc('userIds/' + user.email)
        .set({ providerAccountId: account?.providerAccountId }, { merge: true })

      return true
    },
    async jwt({ token }) {
      await loadFromDB(token)
      return token
    },
    async session({ session, token }) {
      copyToSession(session, token)
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)

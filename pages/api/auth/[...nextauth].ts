import DiscordProvider from 'next-auth/providers/discord'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import NextAuth from 'next-auth'
import { firebaseConfig } from 'config/firebase'

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
  session: {
    strategy: 'jwt',
  },
})

//!? I am going to do custom server-side permission validation for accessing the Firestore database. (This method doesn't require using Firebase's Auth)

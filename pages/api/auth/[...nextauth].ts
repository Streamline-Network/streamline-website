import NextAuth, { AuthOptions } from 'next-auth'
import { db, firebaseConfig } from './../../../config/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import DiscordProvider from 'next-auth/providers/discord'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
  callbacks: {
    async session({ session, token }) {
      const docRef = doc(db, 'users', token.sub!)
      const docSnap = await getDoc(docRef)
      const dataExists = docSnap.exists()

      if (!dataExists || !docSnap.data().role) {
        session.role = 'user'

        await setDoc(
          docRef,
          {
            role: 'user',
          },
          { merge: true }
        )
      } else {
        session.role = docSnap.data().role
      }

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

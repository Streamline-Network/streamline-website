import { getAuth, signInWithCustomToken } from '@firebase/auth'
import { useEffect, useState } from 'react'

import DiscordProvider from 'next-auth/providers/discord'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import NextAuth from 'next-auth'
import { firebaseConfig } from 'config/firebase'
import { useSession } from 'next-auth/react'

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    }),
  ],
  // adapter: FirestoreAdapter(firebaseConfig),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // There is no email or credentials because the Discord Provider does not provide them.
    async signIn({ user, account, profile }) {
      // console.log(user, account, profile)

      return true
    },
  },
})

// const auth = getAuth()

// export function useFirebaseSession() {
//   const session = useSession()
//   const [status, setStatus] = useState(session.status)

//   useEffect(() => {
//     if (session && session.status === 'authenticated') {
//       signInWithCustomToken(auth, session.customToken).then(() => {
//         setStatus('authenticated')
//       })
//     }
//   }, [session])

//   useEffect(() => {
//     if (session.status !== 'authenticated') {
//       setStatus(session.status)
//     }
//   }, [session.status])

//   return { data: session.data, status }
// }

/*
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      state: false,
    }),
  ],
  adapter: FirebaseAdapter({
    db: db,
    ...firestoreFunctions,
  }),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, 'user')
      const customToken = await adminAuth.createCustomToken(user.id)
      const customSignIn = await signInWithCustomToken(auth, customToken)
      console.log(customSignIn, 'customSignIn')
      console.log(customSignIn.user, 'customSignIn.user')
      user = customSignIn.user
      console.log(user, 'user 2')
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      if (session?.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (isNewUser) {
        const additionalClaims = {
          isStudent: true,
          isTeacher: false,
          isStaff: false,
          isAdmin: false
        }
        const customToken = await adminAuth.createCustomToken(token.sub, additionalClaims)
        const customSignIn = await signInWithCustomToken(auth, customToken)
        user = customSignIn.user

      }
      return token
    }

  },

  session: {
    strategy: 'jwt',
  },
})

*/

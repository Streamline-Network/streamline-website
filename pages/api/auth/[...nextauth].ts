import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import NextAuth, { AuthOptions, Session } from 'next-auth'
import { db, firebaseConfig } from './../../../config/firebase'

import DiscordProvider from 'next-auth/providers/discord'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import { JWT } from 'next-auth/jwt'

type DBDefaults = {
  [key: string]: any
}

const DB_DEFAULTS: DBDefaults = {
  role: 'user',
  applicationStage: 0,
}

async function loadFromDB(
  token: JWT,
  docSnap: DocumentSnapshot<DocumentData>,
  docRef: DocumentReference<DocumentData>
) {
  for (const key of Object.keys(DB_DEFAULTS)) {
    const docData = docSnap.data()![key]

    if (docData === undefined) {
      await setDoc(docRef, { [key]: DB_DEFAULTS[key] }, { merge: true })
      token[key] = DB_DEFAULTS[key]
    } else {
      token[key] = docData
    }
  }
}

function copyToSession(session: Session, token: JWT) {
  for (const key of Object.keys(DB_DEFAULTS)) {
    session[key] = token[key]
  }
}

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
    }),
  ],
  adapter: FirestoreAdapter(firebaseConfig),
  callbacks: {
    async jwt({ token }) {
      const docRef = doc(db, 'users', token.sub!)
      const docSnap = await getDoc(docRef)

      await loadFromDB(token, docSnap, docRef)

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

import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import NextAuth, { AuthOptions } from 'next-auth'
import { db, firebaseConfig } from './../../../config/firebase'

import DiscordProvider from 'next-auth/providers/discord'
import { FirestoreAdapter } from '@next-auth/firebase-adapter'

type DBDefaults = {
  [key: string]: any
}

const DB_DEFAULTS: DBDefaults = {
  role: 'user',
  applicationStage: 0,
}

function checkForDBData(
  docSnap: DocumentSnapshot<DocumentData>,
  docRef: DocumentReference<DocumentData>
) {
  Object.keys(DB_DEFAULTS).forEach(key => {
    if (docSnap.data()![key] === undefined) {
      setDoc(docRef, { [key]: DB_DEFAULTS[key] }, { merge: true })
    }
  })
}

async function setDBDefaults(docRef: DocumentReference<DocumentData>) {
  await setDoc(docRef, DB_DEFAULTS, { merge: true })
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
    async session({ session, token }) {
      const docRef = doc(db, 'users', token.sub!)
      const docSnap = await getDoc(docRef)
      const dataExists = docSnap.exists()

      if (!dataExists) {
        session.role = 'user'
        session.applicationStage = 0

        await setDBDefaults(docRef)
      } else {
        checkForDBData(docSnap, docRef)
        session.role = docSnap.data().role
        session.applicationStage = docSnap.data().applicationStage
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

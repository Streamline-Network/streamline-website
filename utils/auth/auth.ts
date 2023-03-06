import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'
import { db } from 'config/firebase'

export type DBDefaults = {
  [key: string]: any
}

const DB_DEFAULTS: DBDefaults = {
  role: 'user',
  applicationStage: 0,
}

const STATE = ['applicationStage']

export async function loadFromDB(token: JWT) {
  let docRef = db.doc(`users/${token.sub!}`)
  let docSnap = await docRef.get()

  for (const key of Object.keys(DB_DEFAULTS)) {
    if (STATE.includes(key)) {
      docRef = db.doc(`userState/${token.sub!}`)
      docSnap = await docRef.get()
    }

    const docData = docSnap.exists ? docSnap.data()![key] : undefined

    if (docData === undefined) {
      await docRef.set({ [key]: DB_DEFAULTS[key] }, { merge: true })
      // await setDoc(docRef, { [key]: DB_DEFAULTS[key] }, { merge: true })
      token[key] = DB_DEFAULTS[key]
    } else {
      token[key] = docData
    }
  }
}

export function copyToSession(session: Session, token: JWT) {
  const OTHERS = ['sub']

  for (const key of Object.keys(DB_DEFAULTS)) {
    session[key] = token[key]
  }

  for (const other of OTHERS) {
    session[other] = token[other]
  }
}

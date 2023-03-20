import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'
import crypto from 'crypto'
import { db } from 'config/firebase'

export type DBDefaults = {
  [key: string]: any
}

const DB_DEFAULTS: DBDefaults = {
  role: 'user',
  applicationStage: 0,
  hasApplied: false,
}

export async function loadFromDB(token: JWT) {
  async function loadId() {
    const docRef = db.doc(`userIds/${token.email}`)
    const docSnap = await docRef.get()

    const docData = docSnap.exists ? docSnap.data()!.id : undefined

    if (docData === undefined) {
      const newId = crypto.randomUUID()
      await docRef.set({ id: newId }, { merge: true })
      token.id = newId
    } else {
      token.id = docData
    }
  }

  await loadId()

  const OTHER_STATES: { [key: string]: string } = { name: token.name! }

  let docRef = db.doc(`userState/${token.id}`)
  let docSnap = await docRef.get()

  for (const key of Object.keys(DB_DEFAULTS)) {
    const docData = docSnap.exists ? docSnap.data()![key] : undefined

    if (docData === undefined) {
      await docRef.set({ [key]: DB_DEFAULTS[key] }, { merge: true })
      token[key] = DB_DEFAULTS[key]
    } else {
      token[key] = docData
    }
  }

  for (const otherState of Object.keys(OTHER_STATES)) {
    if (docSnap.exists && docSnap.data()![otherState]) return
    await docRef.set({ [otherState]: OTHER_STATES[otherState] })
  }
}

export function copyToSession(session: Session, token: JWT) {
  // Any property that is natively on the `token`.
  const OTHERS: string[] = ['email', 'id']

  for (const key of Object.keys(DB_DEFAULTS)) {
    session[key] = token[key]
  }

  for (const other of OTHERS) {
    session[other] = token[other]
  }
}

import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'

export type DBDefaults = {
  [key: string]: any
}

const DB_DEFAULTS: DBDefaults = {
  role: 'user',
  applicationStage: 0,
}

export async function loadFromDB(
  token: JWT,
  docSnap: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
  docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
) {
  for (const key of Object.keys(DB_DEFAULTS)) {
    const docData = docSnap.data()![key]

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

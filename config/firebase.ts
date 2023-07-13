import { AppOptions, cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore, initializeFirestore } from 'firebase-admin/firestore'

import { FirebaseAdapterConfig } from '@next-auth/firebase-adapter'

// Copied from the next-auth repo, modified.
function initFirestore(
  options: AppOptions & { name?: FirebaseAdapterConfig['name'] } = {},
  init?: (db: FirebaseFirestore.Firestore) => void
) {
  const apps = getApps()
  const app = options.name ? apps.find(a => a.name === options.name) : apps[0]

  if (app) return getFirestore(app)

  const db = initializeFirestore(initializeApp(options, options.name))

  if (init) {
    init(db)
  }

  return db
}

export const db = initFirestore(
  {
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  },
  db => {
    db.settings({ ignoreUndefinedProperties: true })
  }
)

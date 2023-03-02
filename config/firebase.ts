import { cert } from 'firebase-admin/app'
import { initFirestore } from '@next-auth/firebase-adapter'

export const db = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBAE_PRIVATE_KEY,
  }),
})

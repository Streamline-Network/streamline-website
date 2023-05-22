import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { Database } from 'pages/api/db/database'
import { authOptions } from '../../../auth/[...nextauth]'
import { db } from 'config/firebase'
import { firestore } from 'firebase-admin'
import { getServerSession } from 'next-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!req.body) return res.status(422).send({ error: message.MISSING_INFORMATION })

  const applicationData = JSON.parse(req.body) as Database.Applications.Apply

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  const applicationsRef = db.doc(`applications/${session.id}/types/apply`)

  await Promise.all([
    db.runTransaction(async transaction => {
      const docSnap = await transaction.get(applicationsRef)

      if (docSnap.exists) {
        const previousApplication = docSnap.data() as Database.Applications.Apply

        if (previousApplication.submissionDetails) {
          previousApplication.comments!.push({
            name: session.user.name,
            senderId: session.id,
            time: Date.now(),
            senderPicture: session.user.image,
            userAction: 'Updated application',
          })
          applicationData.comments = previousApplication.comments

          applicationData.previousSubmissions = previousApplication.previousSubmissions
            ? [...previousApplication.previousSubmissions, previousApplication.submissionDetails]
            : [previousApplication.submissionDetails]
        }
      }

      // Make sure data is safe by only including any expected values.
      const safeData: Database.Applications.Apply = {
        minecraftUuid: applicationData.minecraftUuid,
        submissionDetails: applicationData.submissionDetails,
        type: 'apply',
        state: firestore.FieldValue.delete() as any,
      }

      if (docSnap.exists) {
        safeData.comments = applicationData.comments
        safeData.previousSubmissions = applicationData.previousSubmissions
      }

      transaction.set(applicationsRef, safeData, { merge: true })
    }),
  ])

  return res.status(200).end()
}

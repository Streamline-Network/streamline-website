import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { Database } from 'pages/api/db/database'
import { authOptions } from '../../../auth/[...nextauth]'
import { db } from 'config/firebase'
import { getServerSession } from 'next-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!req.body) return res.status(422).send({ error: message.MISSING_INFORMATION })

  const applicationData = JSON.parse(req.body) as Database.Applications.Apply

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  const applications = db.doc(`applications/${session.id}/types/apply`)

  const docSnap = await applications.get()

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

  await Promise.all([applications.set(applicationData, { merge: true })])

  return res.status(200).end()
}

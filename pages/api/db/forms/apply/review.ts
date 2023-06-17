import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { Comment } from '../../database'
import { QueryResponse } from './collection-group'
import { STAFF_ROLES } from 'middleware'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { db } from 'config/firebase'
import { getMessageToSend } from 'utils/discord/action-messages/staff-change'
import { getServerSession } from 'next-auth'
import { notifyUser } from 'utils/discord/action-messages/notify-user'

// TODO: Whitelist them on MC server

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  // Check if the user is logged in.
  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  // Check if the user is staff.
  if (!STAFF_ROLES.includes(session.role))
    return res.status(401).send({ error: message.NOT_AUTHORIZED })

  const applicationData = JSON.parse(req.body) as QueryResponse

  function getIdFromPath(path: string) {
    const arr = path.split('/')
    return arr[1]
  }

  const newComments = applicationData.application.comments!
  const docRef = db.doc(applicationData.path)

  try {
    await Promise.all([
      applicationData.action !== 'commented' ??
        db.doc(applicationData.path).update({ state: applicationData.application.state }),

      db.runTransaction(async transaction => {
        const snapshot = await transaction.get(docRef)

        if (applicationData.application.state)
          transaction.update(docRef, 'state', applicationData.application.state)

        const comments: Comment[] = snapshot.get('comments') ?? []
        comments.push(newComments[newComments.length - 1])
        transaction.update(docRef, 'comments', comments)
      }),

      applicationData.application.state !== 'pending'
        ? db.doc('userState/' + getIdFromPath(applicationData.path)).update({ applicationStage: 2 })
        : db
            .doc('userState/' + getIdFromPath(applicationData.path))
            .update({ applicationStage: 1 }),

      getMessageToSend(session, applicationData),

      notifyUser(applicationData),
    ])
  } catch {
    return res.status(500).end()
  }

  return res.status(201).end()
}

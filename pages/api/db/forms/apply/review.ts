import * as message from 'utils/constant-messages'

import { Comment, Database } from '../../database'
import { NextApiRequest, NextApiResponse } from 'next'

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

  async function updateDB(applicationData: QueryResponse) {
    const docRef = db.doc(applicationData.path)

    switch (applicationData.action) {
      case 'commented': {
        const newComments = applicationData.application.comments!

        return db.runTransaction(async transaction => {
          const snapshot = await transaction.get(docRef)
          const comments: Comment[] = snapshot.get('comments')
          comments.push(newComments[newComments.length - 1])
          transaction.update(docRef, 'comments', comments)
        })
      }
      // case 'decided': {
      //   return 'promise'
      // }
      // case 'decidedWithReason': {
      //   return 'promise'
      // }
      default: {
        return db.doc(applicationData.path).update(applicationData.application)
      }
    }
  }

  console.log(applicationData.action)

  try {
    await Promise.all([
      updateDB(applicationData),
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

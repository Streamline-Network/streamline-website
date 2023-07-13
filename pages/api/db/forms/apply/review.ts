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
import { setRoles } from 'utils/discord/add-role'
import whitelist from 'utils/minecraft/whitelist'

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

  if (!verifyPath(applicationData.path)) return res.status(422).send({ error: 'Invalid path.' })

  const docRef = db.doc(applicationData.path)

  const mainUserId = applicationData.path.split('/')[1]

  const userIds = (
    await db.collection('userIds').where('id', '==', mainUserId).get()
  ).docs[0].data() as Database.UserIds

  const roleId = process.env.DISCORD_STREAMLINER_ROLE
  if (!roleId) throw new Error('No Role ID ENV set!')

  try {
    await Promise.all([
      db.runTransaction(async transaction => {
        const snapshot = await transaction.get(docRef)

        if (applicationData.application.state)
          transaction.update(docRef, 'state', applicationData.application.state)

        if (applicationData.application.deniedReason)
          transaction.update(docRef, 'deniedReason', applicationData.application.deniedReason)

        const comments: Comment[] = snapshot.get('comments') ?? []
        comments.push(newComments[newComments.length - 1])
        transaction.update(docRef, 'comments', comments)
      }),

      applicationData.application.state !== 'pending'
        ? db.doc('userState/' + getIdFromPath(applicationData.path)).update({ applicationStage: 2 })
        : db
            .doc('userState/' + getIdFromPath(applicationData.path))
            .update({ applicationStage: 1 }),

      applicationData.application.state === 'accepted' && setRoles(userIds, roleId),
      applicationData.application.state === 'accepted' &&
        whitelist({ type: 'add', minecraftUuid: applicationData.application.minecraftUuid }),

      getMessageToSend(session, applicationData),

      notifyUser(applicationData, userIds),
    ])
  } catch (e) {
    console.error(e)
    return res.status(500).end()
  }

  return res.status(201).end()
}

function verifyPath(path: string) {
  const pathArr = path.split('/')

  if ('applications' !== pathArr[0]) return false
  if ('types' !== pathArr[2]) return false
  if ('apply' !== pathArr[3]) return false

  return true
}

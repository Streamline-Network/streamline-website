import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { QueryResponse } from './collection-group'
import { STAFF_ROLES } from 'middleware'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { db } from 'config/firebase'
import { getMessageToSend } from 'utils/discord/action-messages/staff-change'
import { getServerSession } from 'next-auth'
import { notifyUser } from 'utils/discord/action-messages/notify-user'
import { sendMessageToChannel } from 'utils/discord/send-message'

// TODO: Give role on Discord, send welcome message
// TODO: Whitelist them on MC server
// TODO: Denied DM

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

  try {
    await Promise.all([
      db.doc(applicationData.path).update(applicationData.application),
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

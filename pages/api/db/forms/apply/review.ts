import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { QueryResponse } from './collection-group'
import { STAFF_ROLES } from 'middleware'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { db } from 'config/firebase'
import { getServerSession } from 'next-auth'

// TODO: Give role on Discord, send welcome message
// TODO: Change their application state
// TODO: Implement "recent activity"
// TODO: Whitelist them on MC server
// TODO: Denied DM
// TODO: Do reasoning into comments, if denied, then into denied reason and comments

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

  const final = await Promise.all([
    db.doc(applicationData.path).update(applicationData.application),
    applicationData.application.state !== 'pending'
      ? db.doc('userState/' + getIdFromPath(applicationData.path)).update({ applicationStage: 2 })
      : db.doc('userState/' + getIdFromPath(applicationData.path)).update({ applicationStage: 1 }),
  ])

  console.log(final)

  return res.status(201).end()
}

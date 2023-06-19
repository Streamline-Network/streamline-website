import * as message from 'utils/constant-messages'

import type { NextApiRequest, NextApiResponse } from 'next'

import { Database } from '../../database'
import { STAFF_ROLES } from 'middleware'
import { authOptions } from '../../../auth/[...nextauth]'
import { db } from 'config/firebase'
import { getServerSession } from 'next-auth'
import { hasPermission } from 'utils/db/docs'

export default async function handler(req: CustomRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  // Check if the user is logged in.
  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  // Check if the user is staff.
  if (!STAFF_ROLES.includes(session.role))
    return res.status(401).send({ error: message.NOT_AUTHORIZED })

  // Check the method.
  if ('GET' !== req.method) return res.status(405).send({ error: message.WRONG_METHOD })

  const params = req.query as Query

  const collectionId = 'types' // The collection id that all forms are stored in.

  // Check if a path is included.
  if (!params.applicationType || !params.direction || !params.limit)
    return res.status(422).send({ error: message.MISSING_INFORMATION })

  // Check their permissions.
  if (!hasPermission(collectionId, session, res, true))
    return res.status(403).send({ error: message.NOT_AUTHORIZED })

  let query = db
    .collectionGroup(collectionId)
    .where('type', '==', params.applicationType)
    .orderBy('submissionDetails.submissionTime', params.direction)
    .limit(parseInt(params.limit))

  if (params.startAfter) {
    query = query.startAfter(parseInt(params.startAfter))
  }

  const data = await query.get()

  const safeData = data.docs.map(doc => ({ application: doc.data(), path: doc.ref.path }))

  return data
    ? res.status(200).send(safeData)
    : res.status(404).send({ error: message.COULD_NOT_FIND_DOCUMENT })
}

interface CustomRequest extends NextApiRequest {
  method: string
}

export type QueryResponse = {
  path: string
  application: Database.Applications.Apply
  action: 'decided' | 'decidedWithReason' | 'commented'
}

type Query = {
  applicationType: string
  limit: string
  direction: 'asc' | 'desc'
  startAfter?: string
}

import * as message from 'utils/constant-messages'

import type { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../auth/[...nextauth]'
import { db } from 'config/firebase'
import { getServerSession } from 'next-auth'

export default async function handler(
  req: CustomRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  // Check if the user is logged in.
  if (!session)
    return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  if (session.role !== 'admin')
    return res.status(401).send({ error: message.NOT_AUTHORIZED })

  // Check the method.
  if ('GET' !== req.method)
    return res.status(405).send({ error: message.WRONG_METHOD })

  const query = db.collectionGroup('types').where('type', '==', 'apply')

  const data = await query.get()

  res.status(200).json('')
}

interface CustomRequest extends NextApiRequest {
  method: string
}

type Query = {
  path: string
}

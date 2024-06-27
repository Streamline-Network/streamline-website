import * as message from 'utils/constant-messages'

import type { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../auth/[...nextauth]'
import { db } from 'config/firebase'
import { formatUuid } from 'utils/minecraft/uuid'
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

  const query = db
    .collectionGroup('types')
    .where('type', '==', 'apply')
    .where('state', '==', 'accepted')

  const docs = (await query.get()).docs

  const players: { uuid: string; name: string }[] = []

  for (const application of docs) {
    if (!application.exists) continue
    const data = application.data()
    console.log(data)

    players.push({
      uuid: formatUuid(data.minecraftUuid),
      name: data.submissionDetails.answers[
        'What is your Minecraft Java Edition username?'
      ],
    })
  }

  res.status(200).json(players)
}

interface CustomRequest extends NextApiRequest {
  method: string
}

type Query = {
  path: string
}

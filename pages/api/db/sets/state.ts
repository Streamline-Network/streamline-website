import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../../auth/[...nextauth]'
import { db } from 'config/firebase'
import { getServerSession } from 'next-auth'

const ALLOWED_CHANGES = ['applicationStage']

export default async function setState(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  if (!req.body) return res.status(422).send({ error: message.MISSING_INFORMATION })

  const data = JSON.parse(req.body) as StateData

  if (!data.entries) return res.status(422).send({ error: message.MISSING_INFORMATION })

  for (const entry of Object.keys(data.entries)) {
    if (!ALLOWED_CHANGES.find(change => change === entry)) {
      return res.status(403).send({ error: message.NOT_AUTHORIZED })
    }
  }

  const doc = db.doc(`userState/${session.id}`)
  await doc.set(data.entries, { merge: true })

  return res.status(200).send({})
}

export type StateData = {
  entries?: {
    [key: string]: any
  }
}

import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function setState(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  if (!req.body) return res.status(422).send({ error: message.MISSING_INFORMATION })

  return res.status(500).send({ error: 'Oh no, this part of the API is not finished!' })
}

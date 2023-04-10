import { NOT_AUTHENTICATED, NOT_AUTHORIZED } from 'utils/constant-messages'
import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import registerCommands from 'utils/discord/register-commands'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: NOT_AUTHENTICATED })

  if (session.role !== 'admin') return res.status(403).send({ error: NOT_AUTHORIZED })

  const result = await registerCommands()

  console.log(result)

  res.status(200).send(JSON.stringify(result))
}

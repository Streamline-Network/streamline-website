import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import jwt from 'jsonwebtoken'

const DEFAULT_EXPIRATION_TIME = '1m'

export default async function createJwt(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  if (!req.body) return res.status(404).send({ error: message.MISSING_INFORMATION })

  const data = JSON.parse(req.body) as SetNicknameData

  const signedJwt = jwt.sign(data, process.env.BOT_API_SECRET!, {
    expiresIn: DEFAULT_EXPIRATION_TIME,
  })

  try {
    const data = await fetch('http://localhost:3500/set-nickname', {
      method: 'POST',
      headers: new Headers([['Content-Type', 'application/json']]),
      body: JSON.stringify({ token: signedJwt }),
    })

    return res.status(data.status).send(await data.json())
  } catch {
    return res.status(500).send({ error: 'Unexpected error.' })
  }
}

type SetNicknameData = {
  discordId: string
  nickname?: string
}

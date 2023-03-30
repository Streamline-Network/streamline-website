import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import jwt from 'jsonwebtoken'

const DEFAULT_EXPIRATION_TIME = '1m'

export default async function createJwt(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  const signedJwt = jwt.sign({}, process.env.BOT_API_SECRET!, {
    expiresIn: DEFAULT_EXPIRATION_TIME,
  })

  try {
    const members = await (
      await fetch(process.env.BOT_API_URL + '/members', {
        method: 'POST',
        headers: new Headers([['Content-Type', 'application/json']]),
        body: JSON.stringify({ token: signedJwt }),
      })
    ).json()
    return res.status(200).send({ members })
  } catch (err) {
    return res.status(500).send({ error: 'Cannot get members.' })
  }
}

export type MembersData =
  | {
      members: string[]
    }
  | { error: string }

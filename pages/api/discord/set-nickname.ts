import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../auth/[...nextauth]'
import { db } from './../../../config/firebase'
import { getServerSession } from 'next-auth'
import jwt from 'jsonwebtoken'

const DEFAULT_EXPIRATION_TIME = '1m'

export default async function createJwt(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  if (!req.body) return res.status(404).send({ error: message.MISSING_INFORMATION })

  const { nickname } = JSON.parse(req.body) as SetNicknameData

  const ids = (await db.doc(`userIds/${session.email}`).get()).data()!

  // Bypassing the owner because bot permissions wouldn't allow otherwise.
  if (ids.discordId === '290323648357859329') {
    return res.status(200).send({})
  }

  const signedJwt = jwt.sign(
    { nickname, discordId: ids.providerAccountId },
    process.env.BOT_API_SECRET!,
    {
      expiresIn: DEFAULT_EXPIRATION_TIME,
    }
  )

  try {
    const data = await fetch(process.env.BOT_API_URL + '/set-nickname', {
      method: 'POST',
      headers: new Headers([['Content-Type', 'application/json']]),
      body: JSON.stringify({ token: signedJwt }),
    })

    return res.status(data.status).send({})
  } catch {
    return res.status(500).send({ error: 'Unexpected error.' })
  }
}

export type SetNicknameData = {
  nickname?: string
}

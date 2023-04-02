import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../auth/[...nextauth]'
import customFetch from 'utils/fetch'
import { db } from './../../../config/firebase'
import { getServerSession } from 'next-auth'
import jwt from 'jsonwebtoken'
import { setNickname } from 'utils/discord/commands/nickname'

const DEFAULT_EXPIRATION_TIME = '1m'

export default async function createJwt(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  if (!req.body) return res.status(404).send({ error: message.MISSING_INFORMATION })

  const { nickname } = JSON.parse(req.body) as SetNicknameData

  const ids = (await db.doc(`userIds/${session.email}`).get()).data()!

  // Bypassing the owner because bot permissions wouldn't allow otherwise.
  if (ids.discordId === '290323648357859329') {
    return res.status(200).end()
  }

  try {
    const didSucceed = await setNickname(ids.discordId, nickname)

    return res.status(didSucceed ? 201 : 500).end()
  } catch {
    return res.status(500).send({ error: 'Unexpected error.' })
  }
}

export type SetNicknameData = {
  nickname: string
}

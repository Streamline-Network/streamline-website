import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { Database } from '../db/database'
import { authOptions } from '../auth/[...nextauth]'
import { db } from './../../../config/firebase'
import { getServerSession } from 'next-auth'
import { setNickname } from 'utils/discord/set-nickname'

export default async function createJwt(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  if (!req.body) return res.status(404).send({ error: message.MISSING_INFORMATION })

  const { nickname } = JSON.parse(req.body) as SetNicknameData

  const ids = (await db.doc(`userIds/${session.email}`).get()).data()! as Database.UserIds

  // Bypassing the owner because bot permissions wouldn't allow otherwise.
  if (ids.providerAccountId === '290323648357859329') {
    return res.status(201).end()
  }

  const didSucceed = await setNickname(ids.providerAccountId, nickname)

  return res.status(didSucceed ? 201 : 500).end()
}

export type SetNicknameData = {
  nickname: string
}

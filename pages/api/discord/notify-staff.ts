import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../auth/[...nextauth]'
import { getRandomMessage } from '../db/forms/apply/review'
import { getServerSession } from 'next-auth'
import { sendMessageToChannel } from 'utils/discord/send-message'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  const staffChannelId = process.env.DISCORD_STAFF_CHANNEL
  if (!staffChannelId) throw new Error('Missing staff channel id env!')

  const { minecraftUuid } = JSON.parse(req.body) as Notify

  await sendMessageToChannel(staffChannelId, `**${session.user.name} has applied!**`, [
    {
      content: getRandomMessage(),
      link: `${process.env.NEXTAUTH_URL}/account/admin/review?q=${minecraftUuid}`,
    },
  ])

  return res.status(201).end()
}

export type Notify = {
  minecraftUuid: string
}

import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { RESTGetAPIGuildMembersResult } from 'discord-api-types/v10'
import { authOptions } from '../auth/[...nextauth]'
import customFetch from 'utils/fetch'
import { discordAuthHeaders } from 'utils/discord/verify-discord-request'
import { getServerSession } from 'next-auth'

export default async function createJwt(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  try {
    const { data } = await customFetch<RESTGetAPIGuildMembersResult>(
      `${process.env.DISCORD_API_URL}/guilds/${process.env.DISCORD_SERVER_ID}/members?limit=1000`,
      'GET',
      undefined,
      discordAuthHeaders
    )

    const members = data.map(member => member.user?.id)

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

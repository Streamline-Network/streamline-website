import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { NextApiRequest, NextApiResponse } from 'next'

import { verifyDiscordRequest } from 'utils/middleware/discord-api'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!verifyDiscordRequest(req)) return res.status(401).end('Bad request signature')

  const interaction = JSON.parse(req.body) as any

  if (interaction.type === InteractionType.PING) {
    return res.status(200).send({
      type: InteractionResponseType.PONG,
    })
  }
}

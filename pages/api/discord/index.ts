import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { NextApiRequest, NextApiResponse } from 'next'

import { APIApplicationCommandInteraction } from 'discord-api-types/v10'
import { verifyDiscordRequest } from 'utils/middleware/discord-api'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const isValid = !verifyDiscordRequest(req)

  if (isValid) return res.status(401).end('Bad request signature')

  if (!req.body) return res.status(400).end('Expected body.')

  const interaction = req.body

  if (interaction.type === InteractionType.PING) {
    return res.status(200).send({
      type: InteractionResponseType.PONG,
    })
  }

  return res.status(200).end()
}

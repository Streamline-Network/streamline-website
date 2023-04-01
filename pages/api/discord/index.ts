import { InteractionResponseType, InteractionType } from 'discord-interactions'
import { NextApiRequest, NextApiResponse } from 'next'

import { verifyDiscordRequest } from 'utils/middleware/discord-api'

// import { APIApplicationCommandInteraction } from 'discord-api-types/v10'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isValid = !verifyDiscordRequest(req)
  console.log(isValid)

  if (!isValid) return res.status(401).end('Bad request signature')

  if (!req.body) return res.status(400).end('Expected body.')

  const interaction = JSON.parse(req.body) as any

  if (interaction.type === InteractionType.PING) {
    return res.status(200).send({
      type: InteractionResponseType.PONG,
    })
  }

  return res.status(200).end()
}

import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions'
import { NextApiRequest, NextApiResponse } from 'next'

import { verifyDiscordRequest } from 'utils/middleware/discord-api'

// import { type APIApplicationCommandInteraction } from 'discord-api-types/v10'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const processedRequest = await verifyDiscordRequest(req)

  if (!processedRequest.isVerified) return res.status(401).end('invalid request signature')

  const body = processedRequest.body

  if (!body) return res.status(400).end('Expected body.')

  const interaction = JSON.parse(body) as any

  if (interaction.type === InteractionType.PING) {
    return res.status(200).send({
      type: InteractionResponseType.PONG,
    })
  }

  return res.status(200).end()
}

import { APIInteraction, InteractionType } from 'discord-api-types/v10'
import { NextApiRequest, NextApiResponse } from 'next'

import { verifyDiscordRequest } from 'utils/middleware/discord-api'

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

  const interaction = JSON.parse(body) as APIInteraction

  if (interaction.type === InteractionType.Ping) {
    return res.status(200).send({
      type: InteractionType.Ping,
    })
  }

  return res.status(200).end()
}

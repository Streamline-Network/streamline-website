import { APIInteraction, InteractionType } from 'discord-api-types/v10'
import { NextApiRequest, NextApiResponse } from 'next'

import commandHandler from 'utils/discord/command-handler'
import verifyDiscordRequest from 'utils/discord/verify-discord-request'

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

  switch (interaction.type) {
    case InteractionType.Ping: {
      return res.status(200).send({
        type: InteractionType.Ping,
      })
    }
    case InteractionType.ApplicationCommand: {
      const commandResult = await commandHandler(interaction)
      return res.status(commandResult.code).send(commandResult.payload)
    }
    default: {
      return res.status(500).end('Request could not be processed.')
    }
  }
}

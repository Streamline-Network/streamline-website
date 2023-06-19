import {
  RESTPostAPICurrentUserCreateDMChannelJSONBody,
  RESTPostAPICurrentUserCreateDMChannelResult,
} from 'discord-api-types/v10'

import customFetch from 'utils/fetch'
import { discordAuthHeaders } from './verify-discord-request'
import { sendMessageToChannel } from './send-message'

export async function sendDmMessage(
  userId: string,
  message: string,
  buttons: { content: string; link: string }[]
) {
  const result = await customFetch<
    RESTPostAPICurrentUserCreateDMChannelResult,
    RESTPostAPICurrentUserCreateDMChannelJSONBody
  >(
    `${process.env.DISCORD_API_URL}/users/@me/channels`,
    'POST',
    { recipient_id: userId },
    discordAuthHeaders
  )

  await sendMessageToChannel(result.data.id, message, buttons)
}

import { RESTPatchAPIChannelMessageJSONBody } from 'discord-api-types/v10'
import customFetch from 'utils/fetch'
import { discordAuthHeaders } from 'utils/discord/verify-discord-request'

export async function sendMessageToChannel(channelId: string, message: string) {
  const result = await customFetch<undefined, RESTPatchAPIChannelMessageJSONBody>(
    `${process.env.DISCORD_API_URL}/channels/${channelId}/messages`,
    'POST',
    { content: message },
    discordAuthHeaders
  )

  console.log(result)
}

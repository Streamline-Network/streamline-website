import {
  ButtonStyle,
  ComponentType,
  RESTPostAPIChannelMessageJSONBody,
} from 'discord-api-types/v10'

import customFetch from 'utils/fetch'
import { discordAuthHeaders } from 'utils/discord/verify-discord-request'

export async function sendMessageToChannel(
  channelId: string,
  message: string,
  buttons: { content: string; link: string }[]
) {
  const res = await customFetch<undefined, RESTPostAPIChannelMessageJSONBody>(
    `${process.env.DISCORD_API_URL}/channels/${channelId}/messages`,
    'POST',
    {
      content: message,
      components: [
        {
          type: ComponentType.ActionRow,
          components: buttons.map(({ content, link }) => ({
            type: ComponentType.Button,
            url: link,
            style: ButtonStyle.Link,
            label: content,
          })),
        },
      ],
    },
    discordAuthHeaders
  )
}

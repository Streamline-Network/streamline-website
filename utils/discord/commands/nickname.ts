import {
  APIChatInputApplicationCommandGuildInteraction,
  ApplicationCommandOptionType,
  InteractionResponseType,
  MessageFlags,
  RESTPatchAPIGuildMemberJSONBody,
} from 'discord-api-types/v10'

import { CommandObject } from '../command-handler'
import { D_RESPONSE_WENT_WRONG } from 'utils/constant-messages'
import customFetch from 'utils/fetch'
import { discordAuthHeaders } from '../verify-discord-request'

const MAX_DISCORD_NICKNAME_LENGTH = 32

const command: CommandObject = {
  commandInformation: {
    name: 'nickname',
    description: 'Change your nickname.',
    type: 1,
    options: [
      {
        name: 'nickname',
        description: 'The new nickname you want.',
        required: true,
        type: ApplicationCommandOptionType.String,
        max_length: 32,
        min_length: 2,
      },
    ],
  },
  async response(commandInteraction) {
    const { member, data } = commandInteraction as APIChatInputApplicationCommandGuildInteraction

    if (!data.options) throw new Error()

    for (const option of data.options) {
      if (option.name === 'nickname') {
        if (option.type !== ApplicationCommandOptionType.String) return D_RESPONSE_WENT_WRONG

        if (!(await setNickname(member.user.id, option.value))) return D_RESPONSE_WENT_WRONG

        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: { content: 'Your nickname has been set!', flags: MessageFlags.Ephemeral },
        }
      }
    }

    return D_RESPONSE_WENT_WRONG
  },
}

async function setNickname(id: string, nickname: string): Promise<boolean> {
  if (nickname.length > MAX_DISCORD_NICKNAME_LENGTH) return false

  const result = await customFetch<undefined, RESTPatchAPIGuildMemberJSONBody>(
    `${process.env.DISCORD_API_URL}/guilds/${process.env.DISCORD_SERVER_ID}/members/${id}`,
    'PATCH',
    { nick: nickname },
    discordAuthHeaders
  )

  return result.status === 200
}

module.exports = command

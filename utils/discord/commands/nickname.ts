import {
  APIApplicationCommandInteractionDataBasicOption,
  ApplicationCommandOptionType,
  InteractionResponseType,
  RESTPatchAPIGuildMemberJSONBody,
} from 'discord-api-types/v10'

import { CommandObject } from '../command-handler'
import customFetch from 'utils/fetch'
import { discordAuthHeaders } from '../verify-discord-request'
import path from 'node:path'

const MAX_DISCORD_NICKNAME_LENGTH = 32

const command: CommandObject = {
  commandInformation: {
    name: path.basename(__filename),
    description: 'Change your nickname!',
    type: 1,
    options: [
      {
        name: 'nickname',
        description: 'The new nickname you want.',
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  response(commandInteraction) {
    const { member, data } = commandInteraction

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { content: `**Hello** <@${member?.user.id}>` },
    }
  },
}
// setNicknameWithMinecraftName(member?.user.id)

function setNickname(id: number, nickname: string): boolean {
  if (nickname.length > MAX_DISCORD_NICKNAME_LENGTH) return false

  customFetch<undefined, RESTPatchAPIGuildMemberJSONBody>(
    `${process.env.DISCORD_API_URL}/guilds/${process.env.DISCORD_SERVER_ID}/members/${id}`,
    'PATCH',
    { nick: nickname },
    discordAuthHeaders
  )

  return true
}

module.exports = command

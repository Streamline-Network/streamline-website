import {
  APIChatInputApplicationCommandGuildInteraction,
  ApplicationCommandOptionType,
  InteractionResponseType,
  MessageFlags,
} from 'discord-api-types/v10'

import { CommandObject } from '../command-handler'
import { D_RESPONSE_WENT_WRONG } from 'utils/constant-messages'
import { setNickname } from '../set-nickname'

const REGEX = /\((.*?)\)/

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

        if (REGEX.test(option.value)) {
          return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              content: 'Nickname cannot have parentheses.',
              flags: MessageFlags.Ephemeral,
            },
          }
        }

        const oldName = member.nick ?? member.user.username

        let minecraftName = oldName

        if (oldName && REGEX.test(oldName)) {
          minecraftName = oldName.replace(REGEX, '')
        }

        if (
          !(await setNickname(member.user.id, minecraftName.trim() + ` (${option.value.trim()})`))
        ) {
          return {
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              content: `Nickname too long! Total length must be less than 32, yours was ${
                minecraftName.trim().length + option.value.trim().length + 3
              }`,
              flags: MessageFlags.Ephemeral,
            },
          }
        }

        return {
          type: InteractionResponseType.ChannelMessageWithSource,
          data: { content: 'Your nickname has been set!', flags: MessageFlags.Ephemeral },
        }
      }
    }

    return D_RESPONSE_WENT_WRONG
  },
}

module.exports = command

import {
  APIChatInputApplicationCommandGuildInteraction,
  ApplicationCommandType,
  InteractionResponseType,
  MessageFlags,
} from 'discord-api-types/v10'

import { CommandObject } from '../command-handler'
import { setNickname } from '../set-nickname'

const REGEX = /\((.*?)\)/

const command: CommandObject = {
  commandInformation: {
    name: 'remove-nickname',
    description: 'Remove your nickname.',
    type: ApplicationCommandType.ChatInput,
  },
  async response(commandInteraction) {
    const { member } = commandInteraction as APIChatInputApplicationCommandGuildInteraction

    const oldName = member.nick ?? member.user.username

    let minecraftName = oldName

    if (oldName && REGEX.test(oldName)) {
      minecraftName = oldName.replace(REGEX, '')
    }

    if (!(await setNickname(member.user.id, minecraftName.trim()))) {
      return {
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `There has been an issue!`,
          flags: MessageFlags.Ephemeral,
        },
      }
    }

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { content: 'Your nickname has been reset!', flags: MessageFlags.Ephemeral },
    }
  },
}

module.exports = command

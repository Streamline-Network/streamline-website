import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10'

import { CommandObject } from '../command-handler'
import path from 'node:path'

const command: CommandObject = {
  commandInformation: {
    name: 'user',
    description: 'Provides information about the user.',
    type: 1,
  },
  async response(commandInteraction) {
    const { member } = commandInteraction

    return {
      type: InteractionResponseType.ChannelMessageWithSource,
      data: { content: `**Hello** ${member?.user.username}!`, flags: MessageFlags.Ephemeral },
    }
  },
}

module.exports = command

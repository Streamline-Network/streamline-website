import { CommandObject } from 'utils/discord/command-handler'
import { RESTPutAPIApplicationCommandsJSONBody } from 'discord-api-types/v10'
import customFetch from 'utils/fetch'
import { discordAuthHeaders } from 'utils/discord/verify-discord-request'
import fs from 'node:fs'

export default async function registerCommands() {
  const commandFiles = fs.readdirSync('utils/discord/commands')

  console.log('Found these files:', commandFiles)

  const commands: CommandObject[] = []

  for (const file of commandFiles) {
    const command = (await require(`utils/discord/commands/${file}`)) as CommandObject

    commands.push(command)
  }

  const bulkInformation = commands.map(command => command.commandInformation)

  return await customFetch<undefined, RESTPutAPIApplicationCommandsJSONBody>(
    `${process.env.DISCORD_API_URL}/applications/${process.env.DISCORD_CLIENT_ID}/guilds/${process.env.DISCORD_SERVER_ID}/commands`,
    'PUT',
    bulkInformation,
    discordAuthHeaders
  )
}

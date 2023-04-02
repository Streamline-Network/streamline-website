import { CommandObject } from './command-handler'
import fs from 'node:fs'

export default async function registerCommands() {
  const commandFiles = fs.readdirSync('utils/discord/commands').filter(file => file.endsWith('.ts'))

  const commands: CommandObject[] = []

  for (const file of commandFiles) {
    const command = (await require(`utils/discord/commands/${file}`)) as CommandObject
    commands.push(command)
  }

  commands.forEach(command => console.log(command.commandInformation))

  // TODO: use the Discord API to register all commands.
}

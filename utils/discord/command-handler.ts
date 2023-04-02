import {
  APIApplicationCommandInteraction,
  APIInteractionResponse,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord-api-types/v10'

export default async function commandHandler(
  commandInteraction: APIApplicationCommandInteraction
): Promise<CommandHandlerResult> {
  const command =
    (await require(`utils/discord/commands/${commandInteraction.data.name}`)) as CommandObject

  return {
    code: 200,
    payload: command.response(commandInteraction),
  }
}

type CommandHandlerResult = {
  code: number
  payload: APIInteractionResponse
}

export type CommandObject = {
  commandInformation: RESTPostAPIChatInputApplicationCommandsJSONBody
  response: (commandInteraction: APIApplicationCommandInteraction) => APIInteractionResponse
}

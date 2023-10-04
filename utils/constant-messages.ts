import { APIInteractionResponse, InteractionResponseType } from 'discord-api-types/v10'

// MAIN API
export const COULD_NOT_FIND_DOCUMENT =
  'Could not find the request document, please check spelling and try again.'
export const WRONG_METHOD = 'Only "PUT" and "POST" methods are supported by this API.'
export const NOT_AUTHENTICATED = 'Authentication is required to make this request.'
export const NOT_AUTHORIZED = 'You are not authorized to make this request.'
export const MISSING_INFORMATION = 'The request is missing required information to be processed.'
export const INCORRECT_DOC_LENGTH = 'Expected an even length path, got an odd one instead.'
export const INVALID_VARIABLE = 'An unexpected variable was provided.'
export const SERVER_ERROR = 'A server error has occurred.'

// DISCORD BOT
export const D_RESPONSE_WENT_WRONG: APIInteractionResponse = {
  type: InteractionResponseType.ChannelMessageWithSource,
  data: { content: `Something went wrong!` },
}

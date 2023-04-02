import { RESTPatchAPIGuildMemberJSONBody } from 'discord-api-types/v10'
import customFetch from 'utils/fetch'
import { discordAuthHeaders } from './verify-discord-request'

const MAX_DISCORD_NICKNAME_LENGTH = 32

export async function setNickname(id: string, nickname: string): Promise<boolean> {
  if (nickname.length > MAX_DISCORD_NICKNAME_LENGTH) return false

  const result = await customFetch<undefined, RESTPatchAPIGuildMemberJSONBody>(
    `${process.env.DISCORD_API_URL}/guilds/${process.env.DISCORD_SERVER_ID}/members/${id}`,
    'PATCH',
    { nick: nickname },
    discordAuthHeaders
  )

  return result.status === 200
}

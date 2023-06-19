import { Database } from 'pages/api/db/database'
import { RESTPutAPIGuildMemberRoleResult } from 'discord-api-types/v10'
import customFetch from 'utils/fetch'
import { discordAuthHeaders } from './verify-discord-request'

export async function setRoles(
  userIds: Database.UserIds,
  roleId: number | string
): Promise<boolean> {
  const serverId = process.env.DISCORD_SERVER_ID
  if (!serverId) throw new Error('No Server ID ENV set!')

  console.log(roleId)

  const result = await customFetch<RESTPutAPIGuildMemberRoleResult>(
    `${process.env.DISCORD_API_URL}/guilds/${serverId}/members/${userIds.providerAccountId}/roles/${roleId}`,
    'PUT',
    undefined,
    discordAuthHeaders
  )
  console.log(result.data)
  return result.response.ok
}

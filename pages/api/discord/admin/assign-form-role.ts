import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { Database } from 'pages/api/db/database'
import { RESTGetAPIGuildMemberResult } from 'discord-api-types/v10'
import { STAFF_ROLES } from 'middleware'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import customFetch from 'utils/fetch'
import { db } from 'config/firebase'
import { discordAuthHeaders } from 'utils/discord/verify-discord-request'
import { getServerSession } from 'next-auth'
import { setRoles } from 'utils/discord/add-role'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session)
    return res.status(401).send({ error: message.NOT_AUTHENTICATED })
  if (!STAFF_ROLES.includes(session.role))
    return res.status(401).send({ error: message.NOT_AUTHORIZED })

  const roleId = process.env.DISCORD_STREAMLINER_ROLE
  if (!roleId) return res.status(500).send({ error: 'No Role ID ENV set!' })

  try {
    // Get all completed applications (state === 'accepted')
    const applicationsSnap = await db
      .collectionGroup('types')
      .where('type', '==', 'apply')
      .where('state', '==', 'accepted')
      .get()

    const results = []

    for (const doc of applicationsSnap.docs) {
      const appData = doc.data()
      const userId = appData.id || appData.userUuid || doc.ref.parent.parent?.id
      if (!userId) continue

      // Get userIds doc for Discord info
      const userIdsSnap = await db
        .collection('userIds')
        .where('id', '==', userId)
        .get()
      if (userIdsSnap.empty) continue

      const userIds = userIdsSnap.docs[0].data() as Database.UserIds
      if (!userIds.providerAccountId) continue

      // Check if user already has the role using customFetch and Discord API types
      const serverId = process.env.DISCORD_SERVER_ID
      const apiUrl = `${process.env.DISCORD_API_URL}/guilds/${serverId}/members/${userIds.providerAccountId}`
      const { response, data: member } =
        await customFetch<RESTGetAPIGuildMemberResult>(
          apiUrl,
          'GET',
          undefined,
          discordAuthHeaders
        )
      if (!response.ok) continue
      if (
        Array.isArray(member.roles) &&
        member.roles.includes(String(roleId))
      ) {
        results.push({
          userId,
          discordId: userIds.providerAccountId,
          added: false,
        })
        continue
      }

      // Add the role
      const added = await setRoles(userIds, String(roleId))
      results.push({ userId, discordId: userIds.providerAccountId, added })
    }

    return res.status(200).send({ results })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ error: 'Failed to assign roles.' })
  }
}

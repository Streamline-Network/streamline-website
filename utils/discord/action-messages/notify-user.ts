import { Database } from 'pages/api/db/database'
import { QueryResponse } from 'pages/api/db/forms/apply/collection-group'
import { sendDmMessage } from '../send-dm-message'
import { sendMessageToChannel } from '../send-message'

export async function notifyUser(applicationData: QueryResponse, userIds: Database.UserIds) {
  if (!(applicationData.action === 'decided' || applicationData.action === 'decidedWithReason'))
    return

  if (applicationData.application.state === 'denied') {
    return await sendDmMessage(
      userIds.providerAccountId,
      '```Unfortunately you have been denied.```',
      [{ content: 'See why or re-apply', link: `${process.env.NEXTAUTH_URL}/account/apply` }]
    )
  }

  if (applicationData.application.state === 'accepted') {
    const acceptChannel = process.env.DISCORD_ACCEPTED_CHANNEL
    if (!acceptChannel) throw new Error('Missing staff channel id env!')

    const rolesChannel = process.env.DISCORD_ROLES_CHANNEL

    return sendMessageToChannel(
      acceptChannel,
      `Congratulations <@${
        userIds.providerAccountId
      }> you have been accepted and whitelisted to Streamline SMP! ${
        rolesChannel ? `Feel free to choose your roles in the <#${rolesChannel}> channel!` : ''
      }`,
      [{ content: 'View your application', link: `${process.env.NEXTAUTH_URL}/account/apply` }]
    )
  }
}

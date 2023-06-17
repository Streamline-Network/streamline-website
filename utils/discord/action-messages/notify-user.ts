import { Database } from 'pages/api/db/database'
import { QueryResponse } from 'pages/api/db/forms/apply/collection-group'
import { db } from 'config/firebase'
import { sendDmMessage } from '../send-dm-message'
import { sendMessageToChannel } from '../send-message'

export async function notifyUser(applicationData: QueryResponse) {
  if (!(applicationData.action === 'decided' || applicationData.action === 'decidedWithReason'))
    return

  const mainUserId = applicationData.path.split('/')[1]

  const userIds = (
    await db.collection('userIds').where('id', '==', mainUserId).get()
  ).docs[0].data() as Database.UserIds

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

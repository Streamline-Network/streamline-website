import { QueryResponse } from 'pages/api/db/forms/apply/collection-group'
import { Session } from 'next-auth/core/types'
import { random } from 'utils/misc'
import { sendMessageToChannel } from '../send-message'

export async function getMessageToSend(session: Session, applicationData: QueryResponse) {
  const staffChannelId = process.env.DISCORD_STAFF_CHANNEL
  if (!staffChannelId) throw new Error('Missing staff channel id env!')

  const comments = applicationData.application.comments ?? [
    { message: ' {{ An error occurred! }} ' },
  ]

  switch (applicationData.action) {
    case 'decided': {
      return await sendMessageToChannel(
        staffChannelId,
        `**${session!.user.name} has ${
          applicationData.application.state === 'pending'
            ? 'held'
            : applicationData.application.state
        } ${
          applicationData.application.submissionDetails.answers[
            'What is your Minecraft Java Edition username?'
          ]
        }'s application!**`,
        [
          {
            content: getRandomMessage(),
            link: `${process.env.NEXTAUTH_URL}/account/admin/review?q=${applicationData.application.minecraftUuid}`,
          },
        ]
      )
    }
    case 'decidedWithReason': {
      return await sendMessageToChannel(
        staffChannelId,
        `**${session!.user.name} has ${
          applicationData.application.state === 'pending'
            ? 'held'
            : applicationData.application.state
        } ${
          applicationData.application.submissionDetails.answers[
            'What is your Minecraft Java Edition username?'
          ]
        }'s application!**\nTheir reason: \`\`\`${comments[comments.length - 1].message}\`\`\``,
        [
          {
            content: getRandomMessage(),
            link: `${process.env.NEXTAUTH_URL}/account/admin/review?q=${applicationData.application.minecraftUuid}`,
          },
        ]
      )
    }
    case 'commented': {
      return await sendMessageToChannel(
        staffChannelId,
        `**${session!.user.name} has commented on ${
          applicationData.application.submissionDetails.answers[
            'What is your Minecraft Java Edition username?'
          ]
        }'s application!**\nTheir comment: \`\`\`${comments[comments.length - 1].message}\`\`\``,
        [
          {
            content: getRandomMessage(),
            link: `${process.env.NEXTAUTH_URL}/account/admin/review?q=${applicationData.application.minecraftUuid}`,
          },
        ]
      )
    }
    default: {
      return await sendMessageToChannel(
        staffChannelId,
        `**${session!.user.name} has updated ${
          applicationData.application.submissionDetails.answers[
            'What is your Minecraft Java Edition username?'
          ]
        }'s application! -- The application is ${
          applicationData.application.state ?? 'pending'
        }.**`,
        [
          {
            content: getRandomMessage(),
            link: `${process.env.NEXTAUTH_URL}/account/admin/review?q=${applicationData.application.minecraftUuid}`,
          },
        ]
      )
    }
  }
}

export function getRandomMessage() {
  const messages = [
    'View it here',
    'Take a looksie',
    'Grab a peek',
    'See it',
    'Take a gander',
    'Take a glimpse',
    'Take a look',
    'Behold',
    'Witness the glory',
    'Check it out',
    'Inspect this',
    'Feast your eyes',
  ]

  return messages[random(0, messages.length - 1)]
}

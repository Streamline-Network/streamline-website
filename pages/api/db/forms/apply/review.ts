import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { QueryResponse } from './collection-group'
import { STAFF_ROLES } from 'middleware'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { db } from 'config/firebase'
import { getServerSession } from 'next-auth'
import { random } from 'utils/misc'
import { sendMessageToChannel } from 'utils/discord/sendMessage'

// TODO: Give role on Discord, send welcome message
// TODO: Whitelist them on MC server
// TODO: Denied DM

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  // Check if the user is logged in.
  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  // Check if the user is staff.
  if (!STAFF_ROLES.includes(session.role))
    return res.status(401).send({ error: message.NOT_AUTHORIZED })

  const applicationData = JSON.parse(req.body) as QueryResponse

  function getIdFromPath(path: string) {
    const arr = path.split('/')
    return arr[1]
  }

  async function getMessageToSend() {
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

  try {
    await Promise.all([
      db.doc(applicationData.path).update(applicationData.application),
      applicationData.application.state !== 'pending'
        ? db.doc('userState/' + getIdFromPath(applicationData.path)).update({ applicationStage: 2 })
        : db
            .doc('userState/' + getIdFromPath(applicationData.path))
            .update({ applicationStage: 1 }),
      getMessageToSend(),
    ])
  } catch {
    return res.status(500).end()
  }

  return res.status(201).end()
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

  return messages[random(0, messages.length)]
}

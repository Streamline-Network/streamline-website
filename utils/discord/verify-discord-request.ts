import { NextApiRequest } from 'next'
import nacl from 'tweetnacl'
import { parseRawBodyAsString } from 'utils/body-parser'

export default async function verifyDiscordRequest(req: NextApiRequest): Promise<ProcessedRequest> {
  const signature = req.headers['x-signature-ed25519']
  const timestamp = req.headers['x-signature-timestamp']
  const publicKey = process.env.DISCORD_CLIENT_PUBLIC

  if (typeof signature !== 'string' || typeof timestamp !== 'string') return { isVerified: false }

  if (!publicKey) return { isVerified: false }

  if (req.body === null) return { isVerified: false }

  console.log('Validating...')

  try {
    const parsedBody = await parseRawBodyAsString(req)

    console.log('Body parsed!')

    const isValidRequest = nacl.sign.detached.verify(
      Buffer.from(timestamp + parsedBody),
      Buffer.from(signature, 'hex'),
      Buffer.from(publicKey, 'hex')
    )

    console.log(`Validated ${isValidRequest}!`)

    if (isValidRequest) {
      return { isVerified: true, body: parsedBody }
    } else {
      return { isVerified: false }
    }
  } catch (error) {
    console.error(error)
    return { isVerified: false }
  }
}

export const discordAuthHeaders = new Headers()

discordAuthHeaders.set('Authorization', `Bot ${process.env.DISCORD_BOT_TOKEN}`)

discordAuthHeaders.set('User-Agent', 'DiscordBot (https://streamlinesmp.com/, 1.0.0)')

type ProcessedRequest =
  | {
      isVerified: false
    }
  | { isVerified: true; body: string }

import { NextApiRequest } from 'next'
import { parseRawBodyAsString } from 'utils/body-parser'
import { verifyKey } from 'discord-interactions'

export async function verifyDiscordRequest(req: NextApiRequest): Promise<ProcessedRequest> {
  const signature = req.headers['x-signature-ed25519']
  const timestamp = req.headers['x-signature-timestamp']
  const publicKey = process.env.DISCORD_CLIENT_PUBLIC

  console.log(signature, timestamp, publicKey)

  if (typeof signature !== 'string' || typeof timestamp !== 'string') return { isVerified: false }

  if (!publicKey) return { isVerified: false }

  if (req.body === null) return { isVerified: false }

  console.log('Validating...')

  try {
    const parsedBody = await parseRawBodyAsString(req)

    console.log(`Parsed body as ${parsedBody}`)

    const isValidRequest = verifyKey(parsedBody, signature, timestamp, publicKey)

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

type ProcessedRequest =
  | {
      isVerified: false
    }
  | { isVerified: true; body: string }

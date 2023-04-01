import { NextApiRequest, NextApiResponse } from 'next'

import nacl from 'tweetnacl'
import { parseRawBodyAsString } from 'utils/body-parser'
import { verifyKey } from 'discord-interactions'

export default async function discordMiddleware(req: NextApiRequest, res: NextApiResponse) {
  const callbackUrl = req.query.callbackUrl as string

  const signature = req.headers['x-signature-ed25519']
  const timestamp = req.headers['x-signature-timestamp']
  const publicKey = process.env.DISCORD_CLIENT_PUBLIC

  console.log(signature, timestamp, publicKey)

  if (typeof signature !== 'string' || typeof timestamp !== 'string') return false

  if (!publicKey) return false

  if (req.body === null) return false

  console.log('Validating...')

  try {
    const parsedBody = await parseRawBodyAsString(req)

    console.log(`Parsed body as ${parsedBody}`)

    const isValidRequest = verifyKey(parsedBody, signature, timestamp, publicKey)

    const isVerified = nacl.sign.detached.verify(
      Buffer.from(timestamp + parsedBody),
      Buffer.from(signature, 'hex'),
      Buffer.from(publicKey, 'hex')
    )

    console.log(`Validated ${isValidRequest} and ${isVerified}!`)

    if (isValidRequest) {
      return res.redirect(callbackUrl)
    } else {
      return res.status(401).send('invalid request signature')
    }
  } catch (error) {
    console.error(error)
    res.status(400).send('Something unexpected happened!')
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

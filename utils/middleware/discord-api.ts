import { NextApiRequest } from 'next'
import { db } from 'config/firebase'
import nacl from 'tweetnacl'
import { parseRawBodyAsString } from 'utils/body-parser'
import { verifyKey } from 'discord-interactions'

export async function verifyDiscordRequest(req: NextApiRequest) {
  const signature = req.headers['x-signature-ed25519'] as string
  const timestamp = req.headers['x-signature-timestamp'] as string

  const isValidRequest = verifyKey(
    await parseRawBodyAsString(req.body),
    signature,
    timestamp,
    process.env.DISCORD_CLIENT_PUBLIC!
  )

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + parseRawBodyAsString(req)),
    Buffer.from(signature, 'hex'),
    Buffer.from(process.env.DISCORD_CLIENT_PUBLIC!, 'hex')
  )

  db.doc('/other/' + timestamp ?? 'defaulted').set({
    signature: signature ?? req.headers,
    body: req.body,
    parsedBody: await parseRawBodyAsString(req.body),
    isValidRequest,
    isVerified,
    publicKey: process.env.DISCORD_CLIENT_PUBLIC,
  })

  return isValidRequest
}

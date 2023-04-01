import { NextApiRequest } from 'next'
import { db } from 'config/firebase'
import nacl from 'tweetnacl'
import { parseRawBodyAsString } from 'utils/body-parser'
import { verifyKey } from 'discord-interactions'

export async function verifyDiscordRequest(req: NextApiRequest) {
  const signature = req.headers['x-signature-ed25519']
  const timestamp = req.headers['x-signature-timestamp']
  const publicKey = process.env.DISCORD_CLIENT_PUBLIC

  if (typeof signature !== 'string' || typeof timestamp !== 'string') return false

  if (!publicKey) return false

  const isValidRequest = verifyKey(await parseRawBodyAsString(req), signature, timestamp, publicKey)

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + (await parseRawBodyAsString(req))),
    Buffer.from(signature, 'hex'),
    Buffer.from(publicKey, 'hex')
  )

  db.doc('/other/' + timestamp ?? 'defaulted').set({
    signature: signature ?? req.headers,
    body: req.body,
    parsedBody: await parseRawBodyAsString(req),
    isValidRequest,
    isVerified,
    publicKey: process.env.DISCORD_CLIENT_PUBLIC,
  })

  return isValidRequest
}

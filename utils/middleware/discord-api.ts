import { NextApiRequest } from 'next'
import { db } from 'config/firebase'
import { parseRawBodyAsString } from 'utils/body-parser'
import { verifyKey } from 'discord-interactions'

export async function verifyDiscordRequest(req: NextApiRequest) {
  const signature = req.headers['x-signature-ed25519'] as string
  const timestamp = req.headers['x-signature-timestamp'] as string

  const rawBody = await parseRawBodyAsString(req)

  const isValidRequest = verifyKey(
    rawBody,
    signature,
    timestamp,
    process.env.DISCORD_CLIENT_PUBLIC!
  )

  db.doc('/other/' + timestamp).set({
    signature: signature,
    body: rawBody,
    isValidRequest,
  })

  return isValidRequest
}

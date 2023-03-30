import { NextApiRequest } from 'next'
import { db } from 'config/firebase'
import { verifyKey } from 'discord-interactions'

export function verifyDiscordRequest(req: NextApiRequest) {
  const signature = req.headers['x-signature-ed25519'] as string
  const timestamp = req.headers['x-signature-timestamp'] as string

  db.doc('/other/' + timestamp ?? 'defaulted').set({ signature: signature ?? req.headers })

  const isValidRequest = verifyKey(req.body, signature, timestamp, process.env.DISCORD_PUBLIC_KEY!)

  return isValidRequest
}

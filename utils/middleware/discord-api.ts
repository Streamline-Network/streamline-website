import { NextApiRequest } from 'next'
import { verifyKey } from 'discord-interactions'

export function verifyDiscordRequest(req: NextApiRequest) {
  const signature = req.headers['X-Signature-Ed25519'] as string
  const timestamp = req.headers['X-Signature-Timestamp'] as string

  const isValidRequest = verifyKey(req.body, signature, timestamp, process.env.DISCORD_PUBLIC_KEY!)

  return isValidRequest
}

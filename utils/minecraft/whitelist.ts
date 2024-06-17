import jwt, { SignOptions } from 'jsonwebtoken'

import customFetch from 'utils/fetch'

export default async function whitelist(options: WhitelistParams) {
  const apiUrl = process.env.MINECRAFT_URL

  // Allow accepting application when there is no MC server.
  if (!apiUrl) return

  const secret = process.env.MINECRAFT_SECRET
  if (!secret)
    throw new Error("Minecraft Server's API URL or Secret Not Found.")

  const body = {
    action: 'command',
    payload: {},
  }

  const config: SignOptions = { expiresIn: '1h', noTimestamp: false }

  switch (options.type) {
    case 'add':
    case 'remove':
      body.payload = `whitelist ${options.type} ${options.minecraftName}`
      console.log(body)

      await customFetch(apiUrl, 'POST', jwt.sign(body, secret, config))
      return
    case 'list':
      body.payload = `whitelist ${options.type}`

      await customFetch(apiUrl, 'POST', jwt.sign(body, secret, config))
      return
  }
}

type WhitelistParams =
  | {
      type: 'add' | 'remove'
      minecraftName: string
    }
  | {
      type: 'list'
    }

import jwt, { SignOptions } from 'jsonwebtoken'

import customFetch from 'utils/fetch'

export default async function whitelist(options: WhitelistParams) {
  const apiUrl = process.env.MINECRAFT_URL
  const secret = process.env.MINECRAFT_SECRET
  if (!apiUrl || !secret) throw new Error("Minecraft Server's API URL or Secret Not Found.")

  const body = {
    action: 'whitelist',
    payload: {},
  }

  const config: SignOptions = { expiresIn: '1h', noTimestamp: false }

  switch (options.type) {
    case 'add':
    case 'remove':
      body.payload = { operation: options.type, uuid: options.minecraftUuid }
      console.log(body)

      await customFetch(apiUrl, 'POST', jwt.sign(body, secret, config))
      return
    case 'list':
      body.payload = { operation: options.type }

      await customFetch(apiUrl, 'POST', jwt.sign(body, secret, config))
      return
  }
}

type WhitelistParams =
  | {
      type: 'add' | 'remove'
      minecraftUuid: string
    }
  | {
      type: 'list'
    }

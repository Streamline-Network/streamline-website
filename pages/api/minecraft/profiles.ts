import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return res.status(422).send({ error: message.MISSING_INFORMATION })

  const parsedBody = JSON.parse(req.body) as ProfileData

  if (!parsedBody.name) return res.status(422).send({ error: 'Name missing!' })

  try {
    const obj = await (
      await fetch('https://api.mojang.com/users/profiles/minecraft/' + parsedBody.name)
    ).json()

    return res.status(200).send({ uuid: obj.id })
  } catch (error) {
    return res.status(400).send({ error: message.SERVER_ERROR })
  }
}

export type ProfileData = {
  name: string
}

import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) return res.status(404).send({ error: 'No body found.' })

  const parsedBody = JSON.parse(req.body)

  if (!parsedBody.name) return res.status(404).send({ error: 'Name missing!' })

  try {
    const obj = await (
      await fetch('https://api.mojang.com/users/profiles/minecraft/' + parsedBody.name)
    ).json()

    return res.status(200).send({ uuid: obj.id })
  } catch (error) {
    return res.status(400).send({ error: message.SERVER_ERROR })
  }
}

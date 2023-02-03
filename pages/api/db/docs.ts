import type { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  req.body.test

  if (!session)
    return res.status(401).send({ error: 'Authentication is required to make this request.' })

  if (session.role !== 'admin')
    return res.status(403).send({ error: 'You are not authorized to make this request.' })

  res.status(200).send({
    content: '✅✅✅',
  })
}

export default handler

interface CustomRequest extends NextApiRequest {
  body: {
    test: string
  }
}

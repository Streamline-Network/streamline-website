import * as message from 'utils/constant-messages'

import type { NextApiRequest, NextApiResponse } from 'next'
import { getDoc, getPathArray, hasPermission, parsePath } from 'utils/db/docs'

import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function docs(req: CustomRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  // Check if the user is logged in.
  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  // Check the method.
  if ('GET' !== req.method) return res.status(405).send({ error: message.WRONG_METHOD })

  let path = (req.query as Query).path

  // Check if a path is included.
  if (!path) return res.status(422).send({ error: message.MISSING_INFORMATION })

  // Check if the path is correct length.
  if (!(getPathArray(path).length % 2 === 0))
    return res.status(422).send({ error: message.INCORRECT_DOC_LENGTH })

  const parsedPath = parsePath(path, session)

  if (!parsedPath) return res.status(422).send({ error: message.INVALID_VARIABLE })

  console.log(parsedPath)

  // Check their permissions.
  if (!hasPermission(parsedPath, session, res))
    return res.status(403).send({ error: message.NOT_AUTHORIZED })

  const data = await getDoc(parsedPath)

  return data
    ? res.status(200).send({ data })
    : res.status(404).send({ error: message.COULD_NOT_FIND_DOCUMENT })
}

interface CustomRequest extends NextApiRequest {
  method: string
}

type Query = {
  path: string
}

import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function docs(req: CustomRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  // Check if the user is logged in.
  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  // Check the method.
  if ('PUT' !== req.method) return res.status(405).send({ error: message.WRONG_METHOD })

  //! IDEA:
  // Instead of the client being able to change the DB, just have specific commands available.
  // For example: create-application, update-application, change-application-stage, and lastly update-application-status.
  // These could include the data that needs updated, it wouldn't need the path to the database.
  // In some situations it could include options about the command, an example would be which application you are creating or updating.
  //? Example fetch code:
  //? fetch('/api/db/commands', { method: 'PUT', body: JSON.stringify({ command: 'update-application', application: 'apply', payload: {stuff: 'lots of data'} }) })
  //* Types could be used for inline data validation and for a better developer experience.
  //! ----

  // Check for body.
  if (!req.body) return res.status(422).send({ error: message.MISSING_INFORMATION })

  return res.status(403).send({ error: message.NOT_AUTHORIZED })

  return res.status(500).send({ error: 'Oh no, this part of the API is not finished!' })
}

interface CustomRequest extends NextApiRequest {
  method: string
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { getDoc, getPathArray, hasPermission, parsePath } from 'utils/db/docs'

import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

const COULD_NOT_FIND_DOCUMENT =
  'Could not find the request document, please check spelling and try again.'
const WRONG_METHOD = 'Only "PUT" and "POST" methods are supported by this API.'
const NOT_AUTHENTICATED = 'Authentication is required to make this request.'
const NOT_AUTHORIZED = 'You are not authorized to make this request.'
const MISSING_INFORMATION = 'The request is missing required information to be processed.'
const INCORRECT_DOC_LENGTH = 'Expected an even length path, got an one odd instead.'
const INVALID_VARIABLE = 'An unexpected variable was provided.'

/**
 * `API` for handling firestore docs, accepts `PUT` and `POST` methods.
 *
 * `GET` is for just requesting data and `POST` is for changing data.
 */
export default async function docs(req: CustomRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  // Check if the user is logged in.
  if (!session) return res.status(401).send({ error: NOT_AUTHENTICATED })

  // Check the method.
  if (!['PUT', 'GET'].includes(req.method)) return res.status(405).send({ error: WRONG_METHOD })

  let path = (req.query as Query).path

  // Check if a path is included.
  if (!path) return res.status(422).send({ error: MISSING_INFORMATION })

  // Check if the path is correct length.
  if (!(getPathArray(path).length % 2 === 0))
    return res.status(422).send({ error: INCORRECT_DOC_LENGTH })

  const parsedPath = parsePath(path, session)

  if (!parsedPath) return res.status(422).send({ error: INVALID_VARIABLE })

  console.log(parsedPath)

  if (req.method === 'GET') {
    // Check their permissions.
    if (!hasPermission(parsedPath, session)) return res.status(403).send({ error: NOT_AUTHORIZED })

    const data = await getDoc(parsedPath)

    return data
      ? res.status(200).send({ data })
      : res.status(404).send({ error: COULD_NOT_FIND_DOCUMENT })
  } else {
    //! IDEA:
    // Instead of the client being able to change the DB, just have specific commands available.
    // For example: create-application, update-application, change-application-stage, and lastly update-application-status.
    // These could include the data that needs updated, it wouldn't need the path in the database.
    // In some situations it could include options about the command, an example would be which application you are creating or updating.
    //? Example fetch code:
    //? fetch('/api/db/commands', { method: 'PUT', body: JSON.stringify({ command: 'update-application', application: 'apply', payload: {stuff: 'lots of data'} }) })
    //* Types could be used for inline data validation and for a better developer experience.
    //! ----

    // Check for body.
    if (!req.body) return res.status(422).send({ error: MISSING_INFORMATION })
    if (!hasPermission(parsedPath, session, true))
      return res.status(403).send({ error: NOT_AUTHORIZED })

    return res.status(500).send({ error: 'Oh no, this part of the API is not finished!' })
  }
}

interface CustomRequest extends NextApiRequest {
  method: string
}

type Query = {
  /**
   * ### The path should look like this:
   * @example
   * ```ts
   *   const joinData = await fetch('/api/db/docs', {
   *     method: 'PUT',
   *     body: JSON.stringify({ path: 'users/2NUCsnKndShAi6hUvzJE/applications/join' }),
   *   })
   * ```
   *
   * Where `users` is a collection.
   * `2NUCsnKndShAi6hUvzJE` is a document.
   * `applications` is a collection.
   * `join` is the document that will be returned as an object.
   *
   * ### You can also use variables from the auth.
   *
   * Available variables:
   *  - `{user}` The id of the user that is signed in while making a request.
   *  - `{role}` The role of the user that is signed in while making a request.
   *
   * @example
   * ```ts
   *   const joinData = fetch('/api/db/docs', {
   *     method: 'PUT',
   *     body: JSON.stringify({ path: 'users/{user}/applications/join' }),
   *   })
   * ```
   */
  path: string
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { Session, getServerSession } from 'next-auth'

import { Roles } from 'types/index.d'
import { authOptions } from '../auth/[...nextauth]'
import { db } from 'config/firebase'

const SERVER_UNEXPECTED_ERROR =
  'Something unexpected went wrong with the server, please report this to the Streamline SMP owner.'
const COULD_NOT_FIND_DOCUMENT =
  'Could not find the request document, please check spelling and try again.'
const WRONG_METHOD = 'Only "PUT" and "POST" methods are supported by this API.'
const NOT_AUTHENTICATED = 'Authentication is required to make this request.'
const NOT_AUTHORIZED = 'You are not authorized to make this request.'
const MISSING_INFORMATION = 'The request is missing required information to be processed.'
const INCORRECT_DOC_LENGTH = 'Expected an even length path, got an one odd instead.'

function getPathArray(path: string) {
  const pathArr = path.split('/')

  const trimmedPathArr: string[] = []
  for (const pathSegment of pathArr) {
    if (pathSegment !== '') trimmedPathArr.push(pathSegment)
  }

  return trimmedPathArr
}

function hasPermission(parsedPath: string, session: Session) {
  const pathArr = getPathArray(parsedPath)

  switch (pathArr[0]) {
    case 'users':
      if (pathArr[1] === session.sub) return true

    default:
      return false
  }
}

function parsePath(path: string, session: Session) {
  const pathArr = getPathArray(path)

  let parsedPath: string[] = []
  for (const pathSegment of pathArr) {
    const variableRegex = `\{[^\{\}]*\}`

    const matchedVariable = pathSegment.match(variableRegex)

    if (matchedVariable === null) {
      parsedPath.push(pathSegment)
      continue
    }

    const variable = matchedVariable[0]

    switch (variable) {
      case '{user}':
        parsedPath.push(session.sub)
        break
      case '{role}':
        parsedPath.push(session.role)
        break
    }
  }

  let final = ''
  for (const path of parsedPath) {
    final === '' ? (final = path) : (final += '/' + path)
  }

  return final
}

async function getDoc(documentPath: string) {
  const docRef = await db.doc(documentPath).get()

  if (!docRef.exists) return false

  return docRef.data()
}

/**
 * `API` for handling firestore docs, accepts `PUT` and `POST` methods.
 *
 * `PUT` is for just requesting data and `POST` is for changing data.
 */
export default async function docs(req: CustomRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  // Check if the user is logged in.
  if (!session) return res.status(401).send({ error: NOT_AUTHENTICATED })

  // Check the method.
  if (!['PUT', 'POST'].includes(req.method)) return res.status(405).send({ error: WRONG_METHOD })

  // Check for body.
  if (!req.body) return res.status(422).send({ error: MISSING_INFORMATION })

  let path = (JSON.parse(req.body) as ReqBody).path

  // Check if a path is included.
  if (!path) return res.status(422).send({ error: MISSING_INFORMATION })

  // Check if the path is correct length.
  if (!(getPathArray(path).length % 2 === 0))
    return res.status(422).send({ error: INCORRECT_DOC_LENGTH })

  const parsedPath = parsePath(path, session)

  // Check their permissions.
  if (!hasPermission(parsedPath, session)) return res.status(403).send({ error: NOT_AUTHORIZED })

  console.log(parsedPath)

  const data = await getDoc(parsedPath)

  return data
    ? res.status(200).send({ data })
    : res.status(404).send({ error: COULD_NOT_FIND_DOCUMENT })
}

interface CustomRequest extends NextApiRequest {
  method: 'PUT' | 'POST'
}

type ReqBody = {
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

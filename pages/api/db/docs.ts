import { DocumentData, DocumentReference, doc, getDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Roles } from './../../../types/index.d'
import { authOptions } from '../auth/[...nextauth]'
import { db } from 'config/firebase'
import { getServerSession } from 'next-auth/next'

//! POSSIBLE IDEA:
// Make a system that lets me say what properties can be accessed by what role,
// then all the properties that are not specified will be programmatically not allowed.

// This would make all of this reparative code be generated programmatically!
//! --- --- ---

const SERVER_UNEXPECTED_ERROR =
  'Something unexpected went wrong with the server, please report this to the Streamline SMP owner.'
const COULD_NOT_FIND_DOCUMENT =
  'Could not find the request document, please check spelling and try again.'
const WRONG_METHOD = 'Only "GET" and "POST" methods are supported by this API.'
const NOT_AUTHENTICATED = 'Authentication is required to make this request.'
const NOT_AUTHORIZED = 'You are not authorized to make this request.'

async function getData(
  docRef: DocumentReference<DocumentData>,
  res: NextApiResponse,
  document: string
) {
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return res.status(404).send({ error: COULD_NOT_FIND_DOCUMENT })

  return docSnap.data()[document]
}

/**
 * `API` for handling firestore docs, accepts `PUT` and `POST` methods.
 *
 * `PUT` is for just requesting data and `POST` is for changing data.
 */
const handler = async (req: CustomRequest, res: NextApiResponse) => {
  return res.status(500).send({ error: SERVER_UNEXPECTED_ERROR })
}

export default handler

interface CustomRequest extends NextApiRequest {
  method: 'PUT' | 'POST' | string
}

export type DocsReqBody =
  | {
      collection: 'users'
      userId: string

      documentOrCollection:
        | { type: 'document'; document: 'role' | 'image' | 'name' }
        | {
            type: 'collection'
            collection: {
              collectionName: 'forms'
              document: 'acceptanceState' | 'answers'
              content?: string
            }
          }
    }
  | {
      collection: 'accounts'
      document: 'userId'
      uniqueId: string
    }

type Segment =
  | {
      type: 'collection'

      collectionId: string
      segment: Segment

      specialCases: [
        {
          type: 'user-id-must-be-identical'
          rolesAppliedTo: Roles[]
        }
      ]

      readPermissions: Roles[]
      writePermissions: Roles[]
    }
  | {
      type: 'document'

      documentId: string[]

      readPermissions: Roles[]
      writePermissions: Roles[]
    }

import { DocumentData, DocumentReference, doc, getDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

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
  if (!(req.method === 'PUT' || req.method === 'POST')) {
    return res.status(405).send({ error: WRONG_METHOD })
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: NOT_AUTHENTICATED })

  const reqBody: DocsReqBody = JSON.parse(req.body)

  // Logic for permissions

  if ((req.method = 'PUT')) {
    // Ensuring the user requested a valid collection.
    // if (!(reqBody.collection === 'accounts')) return res.status(403).send({ error: NOT_AUTHORIZED })
    switch (reqBody.collection) {
      case 'accounts': {
        // Ensuring the user has sufficient roles for this collection
        if (session.role !== 'admin') return res.status(403).send({ error: NOT_AUTHORIZED })

        // Ensuring the user requested a valid document.
        if (reqBody.document !== 'userId')
          return res.status(403).send({ error: NOT_AUTHORIZED, debug: reqBody.collection })

        const finalData = await getData(
          doc(db, reqBody.collection, reqBody.uniqueId),
          res,
          reqBody.document
        )

        return res.status(200).send({ data: finalData })
      }
      case 'users': {
        if (reqBody.documentOrCollection.type === 'document') {
          // TODO make all valid checks use arrays
          const allowedDocuments = ['image', 'name', 'role']

          // Ensuring the user requested a valid document.
          if (!allowedDocuments.includes(reqBody.documentOrCollection.document))
            return res.status(403).send({ error: NOT_AUTHORIZED })

          const finalData = await getData(
            doc(db, reqBody.collection, reqBody.userId),
            res,
            reqBody.documentOrCollection.document
          )

          return res.status(200).send({ data: finalData })
        }

        if (reqBody.documentOrCollection.type === 'collection') {
          // TODO
        }
      }
      default: {
        return res.status(403).send({ error: NOT_AUTHORIZED })
      }
    }
  }

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

// if (session.role !== 'admin')
// return res.status(403).send({ error: 'You are not authorized to make this request.' })

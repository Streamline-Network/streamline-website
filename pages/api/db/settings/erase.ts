import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../../auth/[...nextauth]'
import { db } from 'config/firebase'
import { getServerSession } from 'next-auth'

export default async function setState(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  let doc = db.doc(`applications/${session.id}`)
  await db.recursiveDelete(doc)

  doc = db.doc(`userState/${session.id}`)
  await db.recursiveDelete(doc)

  doc = db.doc(`userIds/${session.email}`)
  await db.recursiveDelete(doc)

  let query = db.collection('users').where('email', '==', session.email)
  let querySnapshot = await query.get()

  // Get the provider userId for deleting the "account".
  const userId = querySnapshot.docs[0].id

  await querySnapshot.docs[0].ref.delete()

  query = db.collection('accounts').where('userId', '==', userId)
  querySnapshot = await query.get()

  await querySnapshot.docs[0].ref.delete()

  return res.status(200).send({ message: 'All account data successfully deleted.' })
}

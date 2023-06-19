import * as message from 'utils/constant-messages'

import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '../../auth/[...nextauth]'
import { db } from 'config/firebase'
import { getServerSession } from 'next-auth'

export default async function setState(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) return res.status(401).send({ error: message.NOT_AUTHENTICATED })

  const results = await Promise.all([
    db.recursiveDelete(db.doc(`applications/${session.id}`)),
    db.recursiveDelete(db.doc(`userState/${session.id}`)),
    db.recursiveDelete(db.doc(`userIds/${session.email}`)),
    db.collection('users').where('email', '==', session.email).get(),
  ])

  let querySnapshot = results[3]

  const userId = querySnapshot.docs[0].id

  const results2 = await Promise.all([
    querySnapshot.docs[0].ref.delete(),
    db.collection('accounts').where('userId', '==', userId).get(),
  ])

  querySnapshot = results2[1]

  await querySnapshot.docs[0].ref.delete()

  return res.status(200).send({ message: 'All account data successfully deleted.' })
}

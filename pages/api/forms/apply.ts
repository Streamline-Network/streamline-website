import { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from './../auth/[...nextauth]'
import { db } from './../../../config/firebase'
import { getServerSession } from 'next-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  const doc = db.doc(`userState/${session?.sub}`)
  await doc.set({ applicationStage: 1 }, { merge: true })

  if (req.url) return res.redirect(`${process.env.NEXTAUTH_URL!}/account/apply/`)

  return res.status(300).send({ error: 'Request invalid!' })
}

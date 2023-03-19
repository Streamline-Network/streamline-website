import { NextApiRequest, NextApiResponse } from 'next'

import { FormInfo } from './../../../../components/fragments/blocks/block-types.d'
import { MISSING_INFORMATION } from './../../../../utils/constant-messages'
import { NOT_AUTHENTICATED } from 'utils/constant-messages'
import { authOptions } from '../../auth/[...nextauth]'
import { db } from 'config/firebase'
import { getServerSession } from 'next-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!req.body) return res.status(204).send({ error: MISSING_INFORMATION })

  const applicationData = JSON.parse(req.body) as FormInfo

  if (!session) return res.status(401).send({ error: NOT_AUTHENTICATED })

  const state = db.doc(`userState/${session.id}`)
  await state.set({ applicationStage: 1 }, { merge: true })

  const applications = db.doc(`applications/${session.id}/types/debug`)
  await applications.set(applicationData)

  return res.status(200).send({})
}
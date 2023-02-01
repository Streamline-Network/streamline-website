import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  /*   if (req.method !== 'PUT') return res.status(400).json({ error: 'Only PUT methods accepted.' }) */

  console.log('PING!')

  req.body = req.body + ' this has been modified by the Streamline SMP Server!'
  return res.status(200).json({ body: req.body, requestType: req.method })
}

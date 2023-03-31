import { NextApiRequest } from 'next'

export const parseRawBodyAsString = (req: NextApiRequest) =>
  new Promise<string>(resolve => {
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })
    req.on('end', () => {
      resolve(Buffer.from(data).toString())
    })
  })

import { NextApiRequest } from 'next'

export const parseRawBodyAsString = (req: NextApiRequest) =>
  new Promise<string>((resolve, reject) => {
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })
    req.on('end', () => {
      console.log(data)
      resolve(Buffer.from(data).toString())
    })
    req.on('error', error => {
      reject(error)
    })
  })

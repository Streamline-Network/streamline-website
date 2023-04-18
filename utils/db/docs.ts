import { NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { db } from 'config/firebase'

export function getPathArray(path: string) {
  const pathArr = path.split('/')

  const trimmedPathArr: string[] = []
  for (const pathSegment of pathArr) {
    if (pathSegment !== '') trimmedPathArr.push(pathSegment)
  }

  return trimmedPathArr
}

export function hasPermission(
  parsedPath: string,
  session: Session,
  res: NextApiResponse,
  isCollectionGroupRequest = false
): boolean {
  if (isCollectionGroupRequest) {
    switch (parsedPath) {
      case 'types':
        if (session.role === 'reviewer') return true
    }
  }

  const pathArr = getPathArray(parsedPath)

  switch (pathArr[0]) {
    case 'users':
      res.setHeader('Cache-Control', `max-age=${60 * 30} private`)

      if (session.role === 'reviewer') return true
      if (pathArr[1] === session.id) return true

    case 'applications':
      if (session.role === 'reviewer') return true
      if (pathArr[1] === session.id) return true

    case 'userState':
      if (session.role === 'reviewer' || pathArr[1] === session.id) {
        return true
      }

    case 'userIds':
      res.setHeader('Cache-Control', `max-age=${60 * 30} private`)
      if (pathArr[1] === session.email) return true

    default:
      return false
  }
}

export function parsePath(path: string, session: Session) {
  const pathArr = getPathArray(path)
  const VAR_REGEX = `\{[^\{\}]*\}`

  const parsedPath = pathArr.map(pathSegment => {
    const matchedVariable = pathSegment.match(VAR_REGEX)

    if (matchedVariable === null) return pathSegment

    const variable = matchedVariable[0]

    switch (variable) {
      case '{id}':
        return session.id

      case '{role}':
        return session.role

      case '{email}':
        return session.email

      default:
        return false
    }
  })

  if (parsedPath.find(pathSegment => pathSegment === false)) return false

  return parsedPath.reduce((previousValue, currentValue) => previousValue + '/' + currentValue)
}

export async function getDoc(documentPath: string) {
  const docSnap = await db.doc(documentPath).get()

  if (!docSnap.exists) return false

  return docSnap.data()
}

export async function setDoc(path: string, data: object, merge = false) {
  const docRef = db.doc(path)

  docRef.set(data, { merge })
}

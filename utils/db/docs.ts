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

export function hasPermission(parsedPath: string, session: Session, writing = false): boolean {
  const pathArr = getPathArray(parsedPath)

  if (writing) {
    switch (pathArr[0]) {
      case 'applications':
        if (pathArr[1] === session.sub) return true

      case 'applicationData':
        if (session.role === 'reviewer') return true

      case 'userState':
        if (pathArr[1] === session.sub) return true

      default:
        return false
    }
  } else {
    switch (pathArr[0]) {
      case 'users':
        if (session.role === 'reviewer') return true
        if (pathArr[1] === session.sub) return true

      case 'applications':
        if (session.role === 'reviewer') return true
        if (pathArr[1] === session.sub) return true

      case 'applicationData':
        if (session.role === 'reviewer') return true
        if (pathArr[1] === session.sub) return true

      case 'userState':
        if (pathArr[1] === session.sub) return true

      default:
        return false
    }
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
        return session.sub

      case '{role}':
        return session.role

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

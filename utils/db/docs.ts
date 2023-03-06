import { Session } from "next-auth"
import { db } from "config/firebase"

export function getPathArray(path: string) {
  const pathArr = path.split('/')

  const trimmedPathArr: string[] = []
  for (const pathSegment of pathArr) {
    if (pathSegment !== '') trimmedPathArr.push(pathSegment)
  }

  return trimmedPathArr
}

export function hasPermission(parsedPath: string, session: Session) {
  const pathArr = getPathArray(parsedPath)

  switch (pathArr[0]) {
    case 'users':
      if (pathArr[1] === session.sub) return true

    default:
      return false
  }
}

export function parsePath(path: string, session: Session) {
  const pathArr = getPathArray(path)

  let parsedPath: string[] = []
  for (const pathSegment of pathArr) {
    const variableRegex = `\{[^\{\}]*\}`

    const matchedVariable = pathSegment.match(variableRegex)

    if (matchedVariable === null) {
      parsedPath.push(pathSegment)
      continue
    }

    const variable = matchedVariable[0]

    switch (variable) {
      case '{user}':
        parsedPath.push(session.sub)
        break
      case '{role}':
        parsedPath.push(session.role)
        break
    }
  }

  let final = ''
  for (const path of parsedPath) {
    final === '' ? (final = path) : (final += '/' + path)
  }

  return final
}

export async function getDoc(documentPath: string) {
  const docRef = await db.doc(documentPath).get()

  if (!docRef.exists) return false

  return docRef.data()
}
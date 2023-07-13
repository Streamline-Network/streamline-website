export default async function customFetch<T, BodyType = Record<string, JSONAcceptable>>(
  url: string,
  method: Methods = 'GET',
  body?: BodyType,
  headers?: HeadersInit
): Promise<{ response: Response; data: T }> {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch(url, {
        method,
        body: getFinalBody(body),
        headers,
      } as RequestInit)

      let json

      try {
        json = (await result.json()) as T
      } catch (error) {
        json = result as T
      }

      resolve({ response: result, data: json })
    } catch (error) {
      reject(error)
    }
  })
}

function getFinalBody(body?: any) {
  if (typeof body === 'number' || typeof body === 'string') {
    return body
  } else {
    return JSON.stringify(body)
  }
}

type Methods =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | 'CONNECT'
  | 'TRACE'
  | 'PATCH'

type JSONAcceptable =
  | number
  | string
  | boolean
  | null
  | undefined
  | JSONAcceptableObject
  | BigInt
  | JSONAcceptable[]

type JSONAcceptableObject = { [key: string]: JSONAcceptable }

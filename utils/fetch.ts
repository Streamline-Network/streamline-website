export default async function customFetch<T, BodyType = Record<string, JSONAcceptable>>(
  url: string,
  method: Methods = 'GET',
  body?: BodyType,
  headers?: HeadersInit
): Promise<{ status: number; data: T }> {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers,
      })

      let json

      try {
        json = (await result.json()) as T
      } catch (error) {
        json = result as T
      }

      resolve({ status: result.status, data: json })
    } catch (error) {
      reject(error)
    }
  })
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
